from rest_framework import viewsets, generics, filters, permissions
from .models import *
from .serializers import *

class ClinicListView(generics.ListAPIView):
    serializer_class = ClinicSerializer
    #permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name', 'address', 'city', 'country']
    queryset = Clinic.objects.all()

class OperatingRoomView(generics.ListAPIView):
    serializer_class = OperatingRoomSerializer
    #permission_classes = [permissions.IsAuthenticated]
    queryset = OperatingRoom.objects.all()

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

