from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient(models.Model):
    email = models.EmailField(max_length=70, primary_key=True)
    user = models.OneToOneField(User, related_name='account', on_delete=models.CASCADE, null=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    policyNumber = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    phoneNumber = models.IntegerField()
    activated = models.BooleanField()

    def __str__(self):
        return f'{self.firstName} {self.lastName}'

class PatientRegistrationRequest(Patient):
    approved = models.BooleanField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'
