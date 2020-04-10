from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import PatientSerializer, MyTokenObtainPairSerializer, PatientRegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Patient
# Create your views here.

class PatientViewset(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        pass


# JWT customized view

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer