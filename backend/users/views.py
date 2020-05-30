from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import render
from rest_framework import  filters, viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from rest_framework.decorators import api_view
from . import custom_permissions


class PatientViewset(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [custom_permissions.CustomPatientPermissions]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['firstName', 'policyNumber', 'city']
    ordering = ['firstName']
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def list(self, request, *args, **kwargs):
        user = request.user
        query = Patient.objects.select_related().filter(appointments__doctor__email=user).distinct()
        if 'firstName' in request.query_params:
            query = query.filter(firstName__startswith=request.query_params['firstName'])
        if 'lastName' in request.query_params:
            query = query.filter(lastName__startswith=request.query_params['lastName'])
        if 'policyNumber' in request.query_params:
            query = query.filter(policyNumber=request.query_params['policyNumber'])
        if 'country' in request.query_params:
            query = query.filter(country=request.query_params['country'])
        if 'city' in request.query_params:
            query = query.filter(country=request.query_params['city'])
        if ('ordering' in request.query_params):
            query = query.order_by(request.query_params['ordering'])
        else:
            query = query.order_by('firstName')
        serializer = self.get_serializer(query.all(), many=True)

        return Response(serializer.data)

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()


class ClinicAdminViewset(viewsets.ModelViewSet):
    queryset = ClinicAdmin.objects.all()
    serializer_class = ClinicAdminSerializer
    permission_classes = [custom_permissions.CustomClinicAdminPermissions]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        user = instance.user
        user.set_password(instance.password)
        user.save()

        return Response(serializer.data)

class DoctorViewset(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [custom_permissions.CustomDoctorPermissions]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'

    def list(self, request, *args, **kwargs):
        user = request.user
        if (hasattr(user,'adminAccount')):
            query = Doctor.objects.filter(employedAt=user.adminAccount.employedAt)
        if (hasattr(user,'docAccount')):
            query = Doctor.objects.filter(employedAt=user.docAccount.employedAt)
        serializer = self.get_serializer(query, many=True)

        return Response(serializer.data)

    def destroy(self, request, email):
        instance = self.get_object()

        if (len(instance.appointments.all()) > 0):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "Doctor with appointments can't be deleted"})
        else:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        user = instance.user
        user.set_password(instance.password)
        user.save()

        return Response(serializer.data)


class NurseViewset(viewsets.ModelViewSet):
    serializer_class = NurseSerializer
    queryset=Nurse.objects.all()
    permission_classes = [custom_permissions.CustomNursePermissions]
    lookup_field = 'email'
    lookup_value_regex = '[\w@.]+'
    queryset = Nurse.objects.all()

    def perform_destroy(self, instance):
        # Delete the user as well
        user = instance.user
        user.delete()
        instance.delete()

    def list(self, request, *args, **kwargs):
        user = request.user
        query = Nurse.objects.filter(employedAt=user.adminAccount.employedAt)
        serializer = self.get_serializer(query, many=True)

        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        user = instance.user
        user.set_password(instance.password)
        user.save()

        return Response(serializer.data)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def changepass(request):
    try:
        user = request.user
        newPass = request.data['password']
        newPassConfirmation = request.data['password2']
        if (newPass != newPassConfirmation):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'changed': False,'msg': "Passwords don't match."})
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'changed': False, 'msg': "Invalid parameters."})

    if (hasattr(user, 'adminAccount')):
        user.adminAccount.changedPass = True
        user.adminAccount.password = newPass
        user.adminAccount.save()
    if (hasattr(user, 'docAccount')):
        user.docAccount.changedPass = True
        user.docAccount.password = newPass
        user.docAccount.save()
    if (hasattr(user, 'nurseAccount')):
        user.nurseAccount.changedPass = True
        user.nurseAccount.password = newPass
        user.nurseAccount.save()
    user.set_password(newPass)
    user.save()

    return Response(status=status.HTTP_200_OK, data={'changed': True})


@api_view(["GET"])
def profile(request):
    try:
        user = request.user
        if (not user):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "No logged in user."})
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': "No logged in user."})

    if (hasattr(user, 'adminAccount')):
        profile = ClinicAdminSerializer(user.adminAccount, many=False)

        return Response(status=status.HTTP_200_OK, data={'profile': profile.data })
    if (hasattr(user, 'docAccount')):
        profile = DoctorSerializer(user.docAccount, many=False)

        return Response(status=status.HTTP_200_OK, data={'profile': profile.data})
    if (hasattr(user, 'nurseAccount')):
        profile = NurseSerializer(user.nurseAccount, many=False)

        return Response(status=status.HTTP_200_OK, data={'profile': profile.data})

    return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': 'No user profile found'})