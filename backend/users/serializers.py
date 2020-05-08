from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ['user', 'activated']

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
        if instance.approved is False and validated_data.approved is True:
            pass


class ClinicAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicAdmin
        exclude = ['user', 'activated']

    def create(self, validated_data):
        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        user = User.objects.create(username=email,email=email, is_active=False)
        user.set_password(password)
        user.save()
        clinicAdmin = ClinicAdmin(**validated_data)
        clinicAdmin.user = user
        clinicAdmin.save()
        return clinicAdmin

    def update(self, instance, validated_data):
        # Will send an email when updated to approved
        if instance.approved is False and validated_data.approved is True:
            pass



class DoctorSerializer(serializers.ModelSerializer):
    startTime = serializers.SerializerMethodField('get_start_time')
    endTime = serializers.SerializerMethodField('get_end_time')

    def get_start_time(self, obj):
        return getattr(obj, 'startTime', None)

    def get_end_time(self, obj):
        return getattr(obj, 'endTime', None)

    def getClinicId(self, obj):
        user = self.context['request'].user
        userLogged = ClinicAdmin.objects.filter(email=user.username).select_related()
        clinicId = userLogged.employedAt

        return clinicId
    class Meta:
        model = Doctor
        exclude = ['user', 'activated']

    def create(self, validated_data):
        requestBody = self.context['request'].data
        schedule = requestBody['schedule']

        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        user = User.objects.create(username=email,email=email, is_active=False)
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
            token['role'] = "CLINIC_ADMIN"

        if hasattr(user, 'docAccount'):
            token['first_name'] = user.docAccount.firstName
            token['last_name'] = user.docAccount.lastName
            token['email'] = user.docAccount.email
            token['role'] = "DOCTOR"

        return token

