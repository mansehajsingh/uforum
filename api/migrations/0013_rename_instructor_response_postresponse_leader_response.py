# Generated by Django 4.0.2 on 2022-02-26 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_rename_response_postresponse'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postresponse',
            old_name='instructor_response',
            new_name='leader_response',
        ),
    ]
