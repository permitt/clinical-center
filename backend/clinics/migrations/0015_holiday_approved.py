# Generated by Django 3.0.3 on 2020-05-27 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0014_holiday'),
    ]

    operations = [
        migrations.AddField(
            model_name='holiday',
            name='approved',
            field=models.BooleanField(default=False),
        ),
    ]
