# Generated by Django 3.0.3 on 2020-05-03 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20200503_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='schedule',
            field=models.ManyToManyField(blank=True, to='users.Schedule'),
        ),
    ]