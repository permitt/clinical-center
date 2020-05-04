# Generated by Django 3.0.3 on 2020-05-03 21:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_auto_20200503_2311'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='schedule',
        ),
        migrations.AddField(
            model_name='schedule',
            name='employee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Doctor'),
        ),
    ]
