# Generated by Django 4.2.7 on 2023-11-12 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='employee_photos/', verbose_name='Photo'),
        ),
    ]
