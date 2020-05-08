from rest_framework import viewsets, generics, filters, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Avg, F, Sum, OuterRef, Subquery, When, Case
from django.db.models.functions import Coalesce
from users.models import Doctor, Schedule
from users.serializers import DoctorSerializer
from rest_framework import viewsets, generics, filters, permissions
from .models import *
from .custom_permissions import *
from users.models import ClinicAdmin
from .serializers import *
import datetime
from django.db.models import Avg

class ClinicListView(generics.ListAPIView):
    serializer_class = ClinicSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name', 'address', 'city', 'country']
    queryset = Clinic.objects.annotate(rating=Avg('ratings__rating')).all()

class OperatingRoomView(generics.ListAPIView):
    serializer_class = OperatingRoomSerializer
    permission_classes = [OperatingRoomPermissions]
    def get_queryset(self):
        user = self.request.user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        query = OperatingRoom.objects.filter(clinic=userLogged.values('employedAt')[:1])
        return query

class AppointmentTypeListView(generics.ListAPIView):
    queryset = AppointmentType.objects.all()
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentTypeSerializer
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


@api_view(["POST"])
def appointmentCheck(request):
    try:
        date = datetime.datetime.strptime(request.data['appointmentDate'], '%Y-%m-%d')
        dateDay = date.weekday() + 1
        appointmentType = request.data['appointmentType']
        duration = AppointmentType.objects.get(typeName=appointmentType).duration
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':"Invalid parameters."})

    try:

        schedule = Schedule.objects.filter(employee_id = OuterRef('email'), day=dateDay)
        doctors = Doctor.objects\
            .annotate(busyHours = Coalesce(Sum(Case(When(appointments__date=date, then='appointments__typeOf__duration'))), 0),
                      startTime= Subquery(schedule.values('startTime')[:1]),
                      endTime = Subquery(schedule.values('endTime')[:1])) \
            .filter(specializations__typeOf__typeName=appointmentType, busyHours__lte=((F('endTime')-F('startTime'))/60000000)-duration).distinct()

        priceList = PriceList.objects.filter(clinic=OuterRef('id'), appointmentType__typeName=appointmentType)
        clinics = Clinic.objects. \
            annotate(rating=Avg('ratings__rating'), appointmentPrice=Subquery(priceList.values('price'))). \
            filter(doctors__in=doctors).distinct()

        docSer = DoctorSerializer(doctors, many=True)
        clinicSer = ClinicSerializer(clinics, many=True)
        appointments = [{'doctor':'da', 'time':[]}]
        print(doctors.appointments, ' SU APPPSSSS')
        for app in doctors.appointments:
            appointments.append({''})


        return Response(status=status.HTTP_200_OK, data={"doctors": docSer.data, "clinics": clinicSer.data, "appointments":appointments})
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg':'Cannot book an appointment.'})
