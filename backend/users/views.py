from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import PatientSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Patient
from .serializers import PatientRegisterSerializer
from rest_framework import permissions
# Create your views here.

class PatientViewset(viewsets.ViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        pass

class PatientRegisterView(generics.CreateAPIView):
    serializer_class = PatientRegisterSerializer

    permission_classes_by_action = {'create': [permissions.AllowAny],
                                    'list': [permissions.IsAdminUser],
                                    'retrieve': [],
                                    'destroy': []}



# JWT customized view

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer