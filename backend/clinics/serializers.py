from rest_framework import serializers
from .models import *


class ClinicSerializer(serializers.ModelSerializer):
    rating = serializers.DecimalField(decimal_places=2, max_digits=4)
    appointmentPrice = serializers.SerializerMethodField('get_price')

    def get_price(self,obj):
        return getattr(obj, 'appointmentPrice', None)

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

class PriceListSerializer(serializers.ModelSerializer):
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
