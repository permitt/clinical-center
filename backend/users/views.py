from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import PatientSerializer
# Create your views here.

class PatientViewset(viewsets.ViewSet):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        pass
