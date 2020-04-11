from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Patient


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




# JWT custom Serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        if hasattr(user, 'account'):
            token['first_name'] = user.account.firstName
            token['last_name'] = user.account.lastName
            token['email'] = user.account.email

            # Will be expanded as we add more roles
            if isinstance(user.account, Patient):
                token['role'] = "PATIENT"
            else:
                token['role'] = "NONE"
        # ...

        return token

