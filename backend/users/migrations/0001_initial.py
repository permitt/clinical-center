# Generated by Django 3.0.5 on 2020-04-08 15:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('email', models.EmailField(max_length=70, primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=30)),
                ('lastName', models.CharField(max_length=30)),
                ('policyNumber', models.CharField(max_length=40, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('country', models.CharField(max_length=30)),
                ('phoneNumber', models.IntegerField()),
                ('activated', models.BooleanField()),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PatientRegistrationRequest',
            fields=[
                ('patient_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.Patient')),
                ('approved', models.BooleanField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            bases=('users.patient',),
        ),
    ]
