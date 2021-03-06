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
    indices = models.IntegerField(null=False, default=0)

class CommunityJoin(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    join_type = models.IntegerField(null=False)

class Post(models.Model):
    post_id = models.CharField(primary_key=True, unique=True, max_length=32, null=False)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    index = models.IntegerField(null=False, default=-1)
    title = models.TextField(blank=True)
    content = models.TextField(blank=True)

class PostResponse(models.Model):
    response_id =  models.CharField(primary_key=True, unique=True, max_length=32, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    leader_response = models.BooleanField(default=False)