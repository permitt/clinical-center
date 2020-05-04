from rest_framework import serializers
from .models import *


class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentType
        fields = '__all__'

class OperatingRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperatingRoom
        fields = '__all__'

class PriceList(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = '__all__'

class DoctorRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorRating
        fields = '__all__'

class ClinicRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicRating
        fields = '__all__'
