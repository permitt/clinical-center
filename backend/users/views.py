from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import PatientSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Patient
from . import custom_permissions
# Create your views here.

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

# JWT customized view

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer