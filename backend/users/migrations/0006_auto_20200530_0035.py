# Generated by Django 3.0.3 on 2020-05-29 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20200528_2233'),
    ]

    operations = [
        migrations.AddField(
            model_name='clinicadmin',
            name='approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='doctor',
            name='approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='nurse',
            name='approved',
            field=models.BooleanField(default=False),
        ),
    ]
