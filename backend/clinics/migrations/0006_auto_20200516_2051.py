# Generated by Django 3.0.3 on 2020-05-16 18:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0005_auto_20200516_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointmenttype',
            name='clinic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='types', to='clinics.Clinic'),
        ),
    ]