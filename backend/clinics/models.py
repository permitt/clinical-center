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

class AppointmentType(models.Model):
    typeName = models.CharField(max_length=30, unique=True)
    duration = models.IntegerField()

    def __str__(self):
        return self.typeName

class Specialization(models.Model):
    typeOf = models.ForeignKey(to=AppointmentType, on_delete=models.CASCADE)
    doctor = models.ForeignKey(to='users.Doctor', on_delete=models.CASCADE, related_name='specializations')

    def __str__(self):
        return f'{self.doctor.firstName} {self.doctor.lastName} {self.typeOf.typeName}'

class PriceList(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='prices')
    appointmentType = models.ForeignKey(to=AppointmentType, on_delete=models.CASCADE, related_name='prices')
    price = models.FloatField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['clinic', 'appointmentType'], name='unique appointment type price for clinic')
        ]


    def __str__(self):
        return f'{self.clinic.name} {self.appointmentType.typeName}'

class Appointment(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateField()
    time = models.TimeField()
    typeOf = models.ForeignKey(to=AppointmentType, on_delete=models.CASCADE)
    #price from .clinic.prices
    discount = models.IntegerField(default=0)
    doctor = models.ForeignKey(to='users.Doctor', on_delete=models.CASCADE, related_name='appointments')
    operatingRoom = models.ForeignKey(to=OperatingRoom, on_delete=models.CASCADE, related_name='appointments')
    # if the patient is null => the appointment was set inAdvance
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE, related_name='appointments', null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['clinic','dateTime','doctor'], name='unique doctor date time for a clinic')
        ]

    def __str__(self):
        return f'{self.clinic.name} - {self.typeOf.typeName} - {self.dateTime}'

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

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['doctor','patient'], name='one doctor rating per patient')
        ]

    def __str__(self):
        return f'{self.patient.firstName} {self.patient.lastName} {self.doctor.name} {self.rating}'

class ClinicRating(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='ratings')
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=Ratings.choices)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['clinic', 'patient'], name='one clinic rating per patient')
        ]
    def __str__(self):
        return f'{self.patient.firstName} {self.patient.lastName} {self.clinic.name} {self.rating}'