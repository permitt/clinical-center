from django.conf import settings
from django.contrib.auth.models import User
from clinics.models import Specialization
from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .email import ACTIVATION_TITLE, ACTIVATION_BODY
from .models import *


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ['user', 'activation_link']

    def create(self, validated_data):
        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        user = User.objects.create(username=email,email=email, is_active=False)
        user.set_password(password)
        user.save()
        patient = Patient(**validated_data)
        patient.user = user
        patient.save()
        return patient

    def update(self, instance, validated_data):
        # Will send an email when updated to approved
        if instance.approved :
            send_mail(ACTIVATION_TITLE,
                      ACTIVATION_BODY % (
                          instance.firstName, instance.lastName, instance.activation_link),
                      settings.EMAIL_HOST_USER,
                      [instance.email],
                      fail_silently=True)

        return instance

class ClinicAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicAdmin
        exclude = ['user']

    def create(self, validated_data):
        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        user = User.objects.create(username=email,email=email, is_active=True)
        user.set_password(password)
        user.save()
        clinicAdmin = ClinicAdmin(**validated_data)
        clinicAdmin.user = user
        clinicAdmin.save()
        return clinicAdmin

class NurseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nurse
        exclude = ['user']

class DoctorSerializer(serializers.ModelSerializer):
    #rating = serializers.DecimalField(decimal_places=2, max_digits=4)

    def getClinicId(self, obj):
        user = self.context['request'].user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        clinicId = userLogged.employedAt

        return clinicId
    class Meta:
        model = Doctor
        exclude = ['user']

    def create(self, validated_data):
        requestBody = self.context['request'].data
        schedule = requestBody['schedule']

        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        user = User.objects.create(username=email,email=email, is_active=True)
        user.set_password(password)
        user.save()
        doctor = Doctor(**validated_data)
        doctor.user = user
        userLogged = ClinicAdmin.objects.filter(email=self.context['request'].user.username).get()
        clinicId = userLogged.employedAt
        doctor.employedAt = clinicId
        doctor.save()
        try:
            for day in schedule:
                schedule = Schedule.objects.create(employee=doctor, day=day['day'], startTime=day['from'], endTime=day['to'])
                schedule.save()
        except:
            doctor.delete()

        specialization = requestBody['specialization']
        if (specialization):
            specialization = Specialization(doctor=doctor, typeOf_id=specialization)
            specialization.save()

        return doctor


# JWT custom Serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        if hasattr(user, 'patient'):
            token['first_name'] = user.patient.firstName
            token['last_name'] = user.patient.lastName
            token['email'] = user.patient.email
            token['role'] = "PATIENT"
        if hasattr(user, 'adminAccount'):
            token['first_name'] = user.adminAccount.firstName
            token['last_name'] = user.adminAccount.lastName
            token['email'] = user.adminAccount.email
            token['changedPass'] = user.adminAccount.changedPass
            token['role'] = "CLINIC_ADMIN"
        if hasattr(user, 'docAccount'):
            token['first_name'] = user.docAccount.firstName
            token['last_name'] = user.docAccount.lastName
            token['email'] = user.docAccount.email
            token['role'] = "DOCTOR"
            token['changedPass'] = user.docAccount.changedPass
        if hasattr(user, 'nurseAccount'):
            token['first_name'] = user.nurseAccount.firstName
            token['last_name'] = user.nurseAccount.lastName
            token['email'] = user.nurseAccount.email
            token['role'] = "NURSE"
            token['changedPass'] = user.nurseAccount.changedPass

        return token

