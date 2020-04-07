from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient(models.Model):
    email = models.EmailField(max_length=70, primary_key=True)
    user = models.OneToOneField(User, related_name='patient', on_delete=models.CASCADE, null=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    policyNumber = models.CharField(unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    phoneNumber = models.IntegerField(max_length=20)
    activated = models.BooleanField()

    def __str__(self):
        return f'{self.firstName} {self.lastName}'

