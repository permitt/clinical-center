from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model: Patient
        exclude = ['user', 'activated']
        extra_kwargs = {'email': {'write_only': True}, 'policyNumber': {'write_only': True}}

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

            if isinstance(user.account, Patient):
                token['role'] = "PATIENT"
            else:
                token['role'] = "NONE"
        # ...

        return token

