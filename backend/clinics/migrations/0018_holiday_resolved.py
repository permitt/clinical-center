# Generated by Django 3.0.3 on 2020-05-28 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0017_auto_20200527_1843'),
    ]

    operations = [
        migrations.AddField(
            model_name='holiday',
            name='resolved',
            field=models.BooleanField(default=False),
        ),
    ]
