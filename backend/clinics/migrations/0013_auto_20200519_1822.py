# Generated by Django 3.0.5 on 2020-05-19 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_patient_personalid'),
        ('clinics', '0012_auto_20200518_2017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='users.Doctor'),
        ),
    ]