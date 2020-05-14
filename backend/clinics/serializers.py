from rest_framework import serializers
from .models import *
from users.models import ClinicAdmin


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
        exclude = ['clinic']

    def create(self, validated_data):
        requestBody = self.context['request'].data

        name = validated_data.get("name", None)
        number = validated_data.get("password", None)
        userLogged = ClinicAdmin.objects.filter(email=self.context['request'].user.username).get()
        clinicId = userLogged.employedAt
        operatingRoom = OperatingRoom(**validated_data, clinic=clinicId)
        # operatingRoom.clinic = clinicId
        operatingRoom.save()

        return operatingRoom

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
