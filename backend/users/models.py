from django.db import models
from django.contrib.auth.models import User


class Patient(models.Model):
    email = models.EmailField(max_length=70, primary_key=True, unique=True)
    user = models.OneToOneField(User, related_name='account', on_delete=models.CASCADE, null=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    policyNumber = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    phoneNumber = models.IntegerField()
    activated = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'


class ClinicAdmin(models.Model):
    email = models.EmailField(max_length=70, primary_key=True, unique=True)
    user = models.OneToOneField(User, related_name='adminAccount', on_delete=models.CASCADE, null=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    phoneNumber = models.IntegerField()
    activated = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'

class Doctor(models.Model):
    email = models.EmailField(max_length=70, primary_key=True, unique=True)
    employedAt = models.ForeignKey(to='clinics.Clinic', on_delete=models.CASCADE, related_name='doctors', null=True)
    #Treba dodati radno vrijeme doktora
    user = models.OneToOneField(User, related_name='docAccount', on_delete=models.CASCADE, null=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    phoneNumber = models.IntegerField()
    activated = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'