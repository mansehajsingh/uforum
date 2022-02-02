from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(primary_key=True, unique=True, max_length=16)
    full_name = models.CharField(max_length=30)
    password = models.CharField(max_length=60)