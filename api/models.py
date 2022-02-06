from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(primary_key=True, unique=True, max_length=16, null=False)
    full_name = models.CharField(max_length=30, null=False)
    password = models.CharField(max_length=60, null=False)

class Session(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, null=False)
    session_id = models.CharField(max_length=32, unique=False, null=False)
    expiry_date = models.DateTimeField(null=False)