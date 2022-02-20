from os import truncate
from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = "__all__"

class CommunityJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityJoin
        fields = "__all__"

class CommunityOverviewSerializer(serializers.ModelSerializer):
    community = CommunitySerializer(read_only=True)

    class Meta:
        model = CommunityJoin
        fields = ["community", "join_type"]

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"