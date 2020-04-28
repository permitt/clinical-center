# Generated by Django 3.0.5 on 2020-04-28 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0001_initial'),
        ('users', '0008_doctor'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='employedAt',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='doctors', to='clinics.Clinic'),
        ),
    ]
