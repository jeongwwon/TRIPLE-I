# Generated by Django 4.2 on 2023-05-27 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_rename_nickname_profile_email_remove_profile_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='email',
            field=models.CharField(default='default_email', max_length=128),
        ),
    ]