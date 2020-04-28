from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.PriceList)
admin.site.register(models.Clinic)
admin.site.register(models.Appointment)
admin.site.register(models.OperatingRoom)
admin.site.register(models.ClinicRating)
admin.site.register(models.DoctorRating)