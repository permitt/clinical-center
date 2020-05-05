from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from . import custom_permissions


class PatientViewset(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [custom_permissions.CustomPatientPermissions]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()

class ClinicAdminViewset(viewsets.ModelViewSet):
    queryset = ClinicAdmin.objects.all()
    serializer_class = ClinicAdminSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()
# JWT customized view

class DoctorViewset(viewsets.ModelViewSet):
    #queryset = Doctor.objects.all(fristName='ana')
    serializer_class = DoctorSerializer
    permission_classes = [custom_permissions.CustomDoctorPermissions]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def get_queryset(self):
        user = self.request.user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        query = Doctor.objects.filter(employedAt=userLogged.values('employedAt')[:1])

        return query


    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer