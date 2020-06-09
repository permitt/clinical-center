import sys
from rest_framework import viewsets, generics, filters, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import DateTimeField,Avg,IntegerField, F, Sum, OuterRef, Subquery, When, Case, FilteredRelation, Q, Value as V, CharField, TimeField, ExpressionWrapper
from django.db.models.functions import Coalesce
from users.models import Doctor, Schedule
from users.serializers import DoctorSerializer
from rest_framework import viewsets, generics, filters, permissions
from .custom_permissions import *
from .serializers import *
from django.core.mail import send_mail
from .holidayEmail import *
import datetime
from users.models import Patient
from django.db.models.functions import Concat
from django.db import IntegrityError
from django.db.models import Avg

class ClinicListView(viewsets.ModelViewSet):
    serializer_class = ClinicSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name', 'address', 'city', 'country']
    queryset = Clinic.objects.annotate(rating=Avg('ratings__rating')).all()

class HealthCardView(viewsets.ModelViewSet):
    queryset = HealthCard.objects
    serializer_class = HealthCardSerializer
    permission_classes = [HealthCardPermissions]


    def list(self, request):
        queryset = self.get_queryset()
        patient = "pacijent@gmail.com"
        queryset = queryset.filter(patient_id=patient)

        print(request.body)


        serializer = HealthCardSerializer(queryset, many=True)



        return Response(status=status.HTTP_200_OK, data={'healthCard':serializer.data}, content_type='application/json')


class OperatingRoomView(viewsets.ModelViewSet):
    serializer_class = OperatingRoomSerializer
    permission_classes = [OperatingRoomPermissions]


    def list(self, request):
        queryset = self.get_queryset()
        if 'name' in request.query_params:
            queryset = queryset.filter(name__startswith=request.query_params['name'])
        if 'number' in request.query_params:
            queryset = queryset.filter(number=request.query_params['number'])
        if 'date' in request.query_params and 'time' in request.query_params:
            queryset = queryset.exclude(appointment__date=request.query_params['date'], appointment__time=request.query_params['time'])
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
        query = OperatingRoom.objects.filter(clinic=user.adminAccount.employedAt)

        return query

    def destroy(self, request,pk) :
        instance = self.get_object()
        if (len(instance.appointment_set.all()) > 0 or len(instance.operation_set.all())):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Reserved hall can't be deleted"})
        else:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if (len(instance.appointment_set.all()) > 0 or len(instance.operation_set.all())):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Reserved hall can't be changed"})
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

    def get_queryset(self):
        if hasattr(self.request.user, 'patient'):
            return Appointment.objects\
                .filter(patient=self.request.user.patient,date__lt=datetime.datetime.now()).annotate(
                type_name=F("typeOf__typeName"),
                operatinRoom_name=F("operatingRoom__name"),
                clinic_name=F("clinic__name"),
                price=F("typeOf__prices__price")
                )
        if hasattr(self.request.user, 'adminAccount'):
            return Appointment.objects \
                .filter(patient=None,clinic=self.request.user.adminAccount.employedAt,)

        return Appointment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class AppointmentTypeView(viewsets.ModelViewSet):
    queryset = AppointmentType.objects.all()
    permission_classes = [AppointmentTypePermissions]
    serializer_class = AppointmentTypeSerializer

    def get_queryset(self):
        user = self.request.user
        #dodavanje za pacijenta
        if hasattr(user, 'patient'):
            return AppointmentType.objects.all()

        if hasattr(user, 'adminAccount'):
            query = AppointmentType.objects.filter(clinic=user.adminAccount.employedAt).select_related()
        elif hasattr(user, 'docAccount') :
            query = AppointmentType.objects.filter(specializations__doctor__email=user.docAccount.email)

        return query

    def destroy(self, request,pk) :
        instance = self.get_object()
        now = datetime.datetime.now().date()
        for app in instance.appointment_set.all():
            if (now < app.date):
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "This type has following appointments and can't be deleted"})

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        now = datetime.datetime.now().date()
        for app in instance.appointment_set.all():
            if (now < app.date):
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "This type has following appointments and can't be changed"})
        try:
            self.perform_update(serializer)
        except IntegrityError as ext:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data={'msg': "Type with given name already exists"})

        return Response(serializer.data)

class HolidayRequestView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HolidaySerializer

    def get_queryset(self):
        user = self.request.user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        queryset = Holiday.objects.select_related('employee')\
            .filter(resolved=False) \
            .annotate(clinic=Case(When(employee__docAccount__isnull=False, then=F('employee__docAccount__employedAt__pk')),
                                   When(employee__nurseAccount__isnull=False, then=F('employee__nurseAccount__employedAt__pk')),
                                   output_field=CharField()))\
            .annotate(name=Case(When(employee__docAccount__isnull=False, then=Concat('employee__docAccount__firstName',V(' '), 'employee__docAccount__lastName')),
                                   When(employee__nurseAccount__isnull=False, then=Concat('employee__nurseAccount__firstName', V(' '), 'employee__nurseAccount__lastName')),
                      output_field = CharField()))\
            .annotate(email=Case(When(employee__docAccount__isnull=False, then=F('employee__docAccount__email')),
                                   When(employee__nurseAccount__isnull=False, then=F('employee__nurseAccount__email')),
                                   output_field=CharField()))\
            .filter(clinic=userLogged.values('employedAt')[:1]).all()

        return queryset



@api_view(["POST"])
def resolveRequest(request,pk):
    user = request.user
    if (not user):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        decision = request.data['decision']
        holidayRequest = Holiday.objects.select_related('employee').get(pk=pk)
        to_emails = [holidayRequest.employee]
        if (not decision):
            text = request.data['text']
            send_mail(HOLIDAY_REQUEST_TITLE,
                      HOLIDAY_REJECTED_REQUEST_BODY % (text),
                      settings.EMAIL_HOST_USER,
                      to_emails,
                      fail_silently=True)
        else:
            send_mail(HOLIDAY_REQUEST_TITLE,
                      HOLIDAY_APPROVED_REQUEST_BODY % (holidayRequest.startDate.strftime("%m/%d/%Y"), holidayRequest.endDate.strftime("%m/%d/%Y")),
                      settings.EMAIL_HOST_USER,
                      to_emails,
                      fail_silently=True)

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Invalid parameters."})

    holidayRequest.approved = decision
    holidayRequest.resolved = True
    holidayRequest.save()

    return Response(status=status.HTTP_200_OK)


def time_add(time, duration):
    print (time)
    print(duration)
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
        clinicSer = ClinicSerializer(clinics, many=True)
        appointments = []

        for doc in doctors:

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
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':'Cannot book an appointment.'})



class OperationView(viewsets.ModelViewSet):
    serializer_class = OperationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if hasattr(self.request.user, 'patient'):
            return Operation.objects.filter(patient=self.request.user.patient,date__lt=datetime.datetime.now())\
                            .annotate(
                            operatingRoom_name=F("operatingRoom__name"),
                            clinic_name=F("clinic__name"),
            )

        return Operation.objects.all()

class DoctorRatingView(viewsets.ModelViewSet):
    serializer_class = DoctorRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if hasattr(self.request.user, 'patient'):
            return DoctorRating.objects.filter(patient=self.request.user.patient)

        return Operation.objects.all()

class ClinicRatingView(viewsets.ModelViewSet):
    serializer_class = ClinicRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if hasattr(self.request.user, 'patient'):
            return ClinicRating.objects.filter(patient=self.request.user.patient)

        return ClinicRating.objects.all()

@api_view(["POST"])
def scheduleAppointment(request):
    user = request.user
    if (not user):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    data = request.data
    try:
        patient = Patient.objects.filter(email=data['patient']).get()
        if (not patient):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Patient doesn't exists."})
        date = data['date']
        choosenTime = data['time']
        type = data['type']
        if (type != 'operation' and type != 'appointment'):
            raise Exception
        if (type == 'operation'):
            doctorEmails = data['doctors']
            doctors = Doctor.objects.filter(email__in=doctorEmails)
            if (len(doctors) == 0):
                return Response(status=status.HTTP_200_OK, data={'msg': 'Can not schedule operation'})
        if (type == 'appointment'):
            typeApp = data['typeApp']
            if (not typeApp):
                raise Exception
    except:

        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':"Invalid parameters."})

    doctor = user.docAccount
    if (type == 'appointment'):
        type = AppointmentType.objects.get(id=typeApp)
        choosenTime = datetime.datetime.strptime(choosenTime,'%H:%M')
        choosenTimeEnd = time_add(choosenTime, type.duration)


        appointments = Appointment.objects.filter(doctor=doctor,patient=patient,date=date)\
            .annotate(endTime=ExpressionWrapper(F('time') + datetime.timedelta(minutes=F('typeOf__duration')), output_field=TimeField()))\
            .exclude(time__gt=choosenTimeEnd)\
            .exclude(time__lt=choosenTime - F('typeOf__duration') )

#

        print(appointments)

        newAppointment = Appointment(doctor=doctor,patient=patient,time=choosenTime,date=date, clinic=doctor.employedAt, typeOf_id=typeApp)
        #newAppointment.save()

        return Response(status=status.HTTP_200_OK, data={'msg': 'Successfully scheduled appointment'})
    if (type == 'operation'):
        newOperation = Operation(clinic=doctor.employedAt, patient=patient, date=date, time=choosenTime)
        operations = Operation.objects.filter(time=choosenTime).filter(date=date).filter(doctors__in=doctors).distinct().all()

        if(len(operations) > 0):
            return Response(status=status.HTTP_200_OK, data={'msg': 'Can not schedule operation'})
        newOperation.save()
        for doc in doctors:
            newOperation.doctors.add(doc)

        return Response(status=status.HTTP_200_OK, data={'msg': 'Successfully scheduled operation'})


    return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':'Cannot schedule an appointment.'})


@api_view(["GET"])
def income(request):
    user = request.user
    if (not user):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if not('start' in request.query_params and 'end' in request.query_params) :
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':"Invalid parameters."})

    start = request.query_params['start']
    end = request.query_params['end']


    appointments = Appointment.objects.filter(date__lte=end,date__gte=start)\
        .all()\
        .aggregate(income=Sum('typeOf__prices__price'))\

    print(appointments)

    # for a in appointments:
    #     print(a.income)

    #serializer = AppointmentSerializer(appointments, many=True)

    return Response(status=status.HTTP_200_OK, data={'appointments': '', 'income': appointments['income']})

@api_view(["GET"])
def reports(request):
    user = request.user
    if (not user):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    clinic = Clinic.objects\
        .annotate(rating=Avg('ratings__rating')) \
        .prefetch_related('doctors') \
        .get(id=user.adminAccount.employedAt.id)

    clinicSerializer = ClinicSerializer(clinic, many=False)
    doctorSerializer = DoctorSerializer(clinic.doctors.annotate(rating=Avg('ratings__rating')), many=True)

    return Response(status=status.HTTP_200_OK, data={'clinic': clinicSerializer.data, "doctors": doctorSerializer.data})

@api_view(["GET"])
def adminClinic(request):
    user = request.user
    if (not user):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if (not hasattr(user,'adminAccount')):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    clinic = Clinic.objects\
        .annotate(rating=Avg('ratings__rating')) \
        .get(id=user.adminAccount.employedAt.id)

    clinicSerializer = ClinicSerializer(clinic, many=False)

    return Response(status=status.HTTP_200_OK, data={'clinic': clinicSerializer.data})