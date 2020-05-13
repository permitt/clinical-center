# Generated by Django 3.0.5 on 2020-05-04 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0009_auto_20200504_1716'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='appointment',
            name='unique doctor date time for a clinic',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='dateTime',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddConstraint(
            model_name='appointment',
            constraint=models.UniqueConstraint(fields=('clinic', 'date', 'time', 'doctor'), name='unique doctor date time for a clinic'),
        ),
    ]