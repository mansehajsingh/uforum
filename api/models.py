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

class Community(models.Model):
    community_id = models.CharField(primary_key=True, unique=True, max_length=32, null=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, null=False)
    description = models.TextField(blank=True)

class CommunityJoin(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    join_type = models.IntegerField(null=False)