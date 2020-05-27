import sys
from rest_framework import viewsets, generics, filters, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Avg, F, Sum, OuterRef, Subquery, When, Case
from django.db.models.functions import Coalesce
from users.models import Doctor, Schedule
from users.serializers import DoctorSerializer
from rest_framework import viewsets, generics, filters, permissions
from .custom_permissions import *
from .serializers import *
import datetime
from django.db import IntegrityError
from django.db.models import Avg

class ClinicListView(generics.ListAPIView):
    serializer_class = ClinicSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name', 'address', 'city', 'country']
    queryset = Clinic.objects.annotate(rating=Avg('ratings__rating')).all()

class OperatingRoomView(viewsets.ModelViewSet):
    serializer_class = OperatingRoomSerializer
    permission_classes = [OperatingRoomPermissions]


    def list(self, request):
        queryset = self.get_queryset()
        if 'name' in request.query_params:
            queryset = queryset.filter(name__startswith=request.query_params['name'])
        if 'number' in request.query_params:
            queryset = queryset.filter(number=request.query_params['number'])
        if 'date' in request.query_params :
            queryset = queryset.exclude(appointment__date=request.query_params['date'])
        serializer = OperatingRoomSerializer(queryset, many=True)
        appTypeSerializer = AppointmentTypeSerializer
        dates = {}
        for hall in queryset :
            dates[hall.name] = []
            for app in hall.appointment_set.all() :
                dates[hall.name].append({'date': app.date, 'time': app.time, 'type': appTypeSerializer(app.typeOf).data })

        return Response(status=status.HTTP_200_OK, data={"halls": serializer.data , "reservedDates": dates}, content_type='application/json')

    def get_queryset(self):
        user = self.request.user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        query = OperatingRoom.objects.filter(clinic=userLogged.values('employedAt')[:1])

        return query

    def destroy(self, request,pk) :
        instance = self.get_object()
        if (len(instance.appointment_set.all()) > 0):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Reserved hall can't be deleted"})
        else:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_update(serializer)
        except IntegrityError as ext:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED,
                            data={'msg': "Operating room with given name already exists"})

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except IntegrityError as ext:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED,
                            data={'msg': "Operating room with given name already exists"})

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()


class AppointmentTypeView(viewsets.ModelViewSet):
    queryset = AppointmentType.objects.all()
    permission_classes = [AppointmentTypePermissions]
    serializer_class = AppointmentTypeSerializer

    def get_queryset(self):
        user = self.request.user
        #dodavanje za pacijenta
        if hasattr(user, 'patient'):
            return AppointmentType.objects.all()

        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        query = AppointmentType.objects.filter(clinic=userLogged.values('employedAt')[:1]).select_related()

        return query

    def destroy(self, request,pk) :
        instance = self.get_object()
        now = datetime.datetime.now().date()
        for app in instance.appointment_set.all():
            if (now < app.date):
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "This type has following appointments and can't be deleted"})
        else:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_update(serializer)
        except IntegrityError as ext:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data={'msg': "Type with given name already exists"})

        return Response(serializer.data)





#     def get_queryset(self):
#         queryset = Clinic.objects.all()
#         #obavezni parametri za zakazivanje
#         date = self.request.query_params('date', None)
#         type = self.request.query_params('type', None)
#         if date is not None and type is not None:
#             queryset = queryset.filter(doctors__spec=type)
#         return queryset
#
#
#
#
# class ClinicViewset(viewsets.ModelViewSet):
#     queryset = Clinic.objects.all()
#     serializer_class = ClinicSerializer
#     #permission_classes = [custom_permissions.CustomPatientPermissions]


def time_add(time, duration):
    start = datetime.datetime(
        2000, 1, 1,
        hour=time.hour, minute=time.minute, second=time.second)
    end = start + datetime.timedelta(minutes=duration)
    return end.time()

@api_view(["POST"])
def appointmentCheck(request):
    try:
        date = datetime.datetime.strptime(request.data['appointmentDate'], '%Y-%m-%d')
        dateDay = date.weekday()
        appointmentType = request.data['appointmentType']
        #duration = AppointmentType.objects.get(typeName=appointmentType).duration
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':"Invalid parameters."})

    try:
        schedule = Schedule.objects.filter(employee_id = OuterRef('email'), day=dateDay)
        appTypes = AppointmentType.objects.filter(clinic = OuterRef('employedAt'), typeName=appointmentType)
        doctors = Doctor.objects\
            .annotate(busyHours = Coalesce(Sum(Case(When(appointments__date=date, then='appointments__typeOf__duration'))), 0),
                      startTime= Subquery(schedule.values('startTime')[:1]),
                      endTime = Subquery(schedule.values('endTime')[:1]),
                      rating = Avg('ratings__rating'),
                      duration = Subquery(appTypes.values('duration')),
                      ) \
            .filter(specializations__typeOf__typeName=appointmentType, busyHours__lte=((F('endTime')-F('startTime'))/60000000)-F('duration')).distinct()

        priceList = PriceList.objects.filter(clinic=OuterRef('id'), appointmentType__typeName=appointmentType)
        clinics = Clinic.objects. \
            annotate(rating=Avg('ratings__rating'), appointmentPrice=Subquery(priceList.values('price'))). \
            filter(doctors__in=doctors).distinct()

        docSer = DoctorSerializer(doctors, many=True)
        print(docSer.data, " DOKTORIIII BRE")
        clinicSer = ClinicSerializer(clinics, many=True)
        appointments = []

        for doc in doctors:
            #appointments.append()
            print(" OVOLIKO ZAUZET DOKTOR JU ", doc.busyHours)
            doctorElement = {'doctor':doc.email, 'time':[]}
            time = doc.startTime
            endTime = doc.endTime
            appointmentsQS = Appointment.objects.filter(doctor=doc, date=date)
            duration = doc.duration

            while(time_add(time, duration) <= endTime):

                time_advanced = False
                for app in appointmentsQS:
                    appEndTime = time_add(app.time, app.typeOf.duration)
                    nextEndTime = time_add(time, duration)
                    if (app.time <= time < appEndTime or app.time < nextEndTime <= appEndTime):
                        time = appEndTime
                        time_advanced = True
                    elif(time <= app.time < nextEndTime or time < appEndTime <= nextEndTime ):
                        time = appEndTime
                        time_advanced = True

                if time_advanced:
                    continue

                doctorElement['time'].append(time)
                time = time_add(time, duration)

            appointments.append(doctorElement)
        return Response(status=status.HTTP_200_OK, data={"doctors": docSer.data, "clinics": clinicSer.data, "availableTerms":appointments}, content_type='application/json')
    except Exception as inst:
        print(inst)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':'Cannot book an appointment.'})
