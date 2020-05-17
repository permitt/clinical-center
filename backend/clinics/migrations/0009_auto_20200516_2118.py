# Generated by Django 3.0.3 on 2020-05-16 19:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0008_auto_20200516_2116'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='appointmenttype',
            name='type names in one clinic must be distinct',
        ),
        migrations.AlterUniqueTogether(
            name='appointmenttype',
            unique_together={('typeName', 'clinic')},
        ),
    ]
