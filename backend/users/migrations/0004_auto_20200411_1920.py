# Generated by Django 3.0.5 on 2020-04-11 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200410_2040'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PatientRegister',
        ),
        migrations.AddField(
            model_name='patient',
            name='approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='patient',
            name='activated',
            field=models.BooleanField(default=False),
        ),

    ]
