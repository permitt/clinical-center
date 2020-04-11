from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import PatientSerializer, MyTokenObtainPairSerializer, PatientRegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Patient
from . import custom_permissions
# Create your views here.

class PatientViewset(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [custom_permissions.CustomPatientPermissions]



# JWT customized view

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer