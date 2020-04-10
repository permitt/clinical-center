from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Patient, PatientRegister

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ['user', 'activated']
        # Mozda neces moc uopste da ih kreiras ovako
        extra_kwargs = {'email': {'read_only': True}, 'policyNumber': {'read_only': True}}

    def create(self, validated_data):
        pass


class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientRegister
        fields = '__all__'
        extra_kwargs = {}



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

