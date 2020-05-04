from rest_framework import viewsets, generics, filters, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, F, Sum, Avg
from users.models import Doctor
from .models import *
from .serializers import *


class ClinicListView(generics.ListAPIView):
    serializer_class = ClinicSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name', 'address', 'city', 'country']
    queryset = Clinic.objects.annotate(rating=Avg('ratings__rating')).all()

class AppointmentTypeListView(generics.ListAPIView):
    queryset = AppointmentType.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
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

