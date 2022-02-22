# Generated by Django 4.0.2 on 2022-02-21 23:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_community_indices_post_index'),
    ]

    operations = [
        migrations.CreateModel(
            name='Response',
            fields=[
                ('response_id', models.CharField(max_length=32, primary_key=True, serialize=False, unique=True)),
                ('content', models.TextField(blank=True)),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.community')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.post')),
            ],
        ),
    ]