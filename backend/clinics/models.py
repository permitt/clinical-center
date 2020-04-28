from django.db import models


class Clinic(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    description = models.TextField()
    #availableTerms - should just check the reserved dateTimes

    class Meta:
        ordering = ['name', 'city', 'country']

    def __str__(self):
        return self.name

class OperatingRoom(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='operating_rooms')
    name = models.CharField(max_length=20)
    number = models.IntegerField()
    def __str__(self):
        return f'{self.name} {self.number}'

class PriceList(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='prices')
    appointmentType = models.CharField(max_length=30, unique=True)
    price = models.FloatField()

class Appointment(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='appointments')
    dateTime = models.DateTimeField()
    typeOf = models.CharField(max_length=30)
    #price from .clinic.prices
    discount = models.IntegerField(default=0)
    doctor = models.ForeignKey(to='users.Doctor', on_delete=models.CASCADE, related_name='appointments')
    operatingRoom = models.ForeignKey(to=OperatingRoom, on_delete=models.CASCADE, related_name='appointments')
    # if the patient is null => the appointment was set inAdvance
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE, related_name='appointments', null=True)

class Ratings(models.IntegerChoices):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5

class DoctorRating(models.Model):
    doctor = models.ForeignKey(to='users.Doctor', on_delete=models.CASCADE, related_name='ratings')
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=Ratings.choices)

class ClinicRating(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='ratings')
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=Ratings.choices)
