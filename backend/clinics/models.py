from django.db import models
from .email import APPOINTMENT_REQUEST_BODY, APPOINTMENT_REQUEST_TITLE
from django.core.mail import send_mail
from users.models import ClinicAdmin
from django.conf import settings

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

class HealthCard(models.Model):
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE, related_name="health_card")
    # istorija bolesti
    # recepte iz spiska koje na kraju pregleda med sestra mora da ovjeri???
    # dijagnoze kao npr : dioptrija, alergija
    # izvjestaj o pregledu
    """
    Izveštaje o pregledu može da unosi
    samo lekar koji je izvršio taj pregled i medicinske sestre. Izmena izveštaja starih
    pregleda je moguća isključivo od strane lekara koji je taj pregled izvršio
    
     WUT, posle koliko  
    """

class OperatingRoom(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='operating_rooms')
    name = models.CharField(max_length=20)
    number = models.IntegerField()
    def __str__(self):
        return f'{self.name} {self.number}'

    class Meta:
        unique_together = ['clinic', 'name']

class AppointmentType(models.Model):
    typeName = models.CharField(max_length=30)
    duration = models.IntegerField()
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='types')

    class Meta:
        unique_together = ['typeName', 'clinic']

    def __str__(self):
        return f'{self.typeName} at {self.clinic.name}'

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
        return f'{self.price}'

class Appointment(models.Model):
    clinic = models.ForeignKey(to=Clinic, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    typeOf = models.ForeignKey(to=AppointmentType, on_delete=models.CASCADE)
    #price from .clinic.prices
    discount = models.IntegerField(default=0)
    doctor = models.ForeignKey(to='users.Doctor', on_delete=models.CASCADE, related_name='appointments')
    # if the operatingRoom is Null => this is a request for the ClinicAdmin to approve
    operatingRoom = models.ForeignKey(to=OperatingRoom, on_delete=models.CASCADE, null=True)
    # if the patient is null => the appointment was set inAdvance
    patient = models.ForeignKey(to='users.Patient', on_delete=models.CASCADE, related_name='appointments', null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['clinic', 'date', 'time', 'doctor'], name='unique doctor date time for a clinic')
        ]

    def save(self, *args, **kwargs):
        super(Appointment, self).save(*args, **kwargs)

        if self.operatingRoom is None:
            clinic_admins = ClinicAdmin.objects.select_related('employedAt').filter(employedAt=self.clinic)
            to_emails = [admin.email for admin in clinic_admins]

            send_mail(APPOINTMENT_REQUEST_TITLE,
                  APPOINTMENT_REQUEST_BODY % (
                   self.date, self.time, self.typeOf, self.doctor, self.patient),
                  settings.EMAIL_HOST_USER,
                  to_emails,
                  fail_silently=True)


    def __str__(self):
        return f'{self.clinic.name} - {self.typeOf.typeName} - {self.date} : {self.time}, {self.operatingRoom}'

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
        return f'{self.patient.firstName} {self.patient.lastName} {self.doctor.firstName} {self.rating}'

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