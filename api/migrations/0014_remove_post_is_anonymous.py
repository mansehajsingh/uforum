# Generated by Django 4.0.2 on 2022-02-26 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_rename_instructor_response_postresponse_leader_response'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='is_anonymous',
        ),
    ]
