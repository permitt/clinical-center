from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model: Patient
        exclude = ['user', 'activated']
        extra_kwargs = {'email': {'write_only': True}, 'policyNumber': {'write_only': True}}
