# Generated by Django 3.0.5 on 2020-05-04 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_schedule_employee'),
        ('clinics', '0006_auto_20200502_2351'),
    ]

    operations = [
        migrations.CreateModel(
            name='Specialization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specializations', to='users.Doctor')),
                ('typeOf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clinics.AppointmentType')),
            ],
        ),
    ]
