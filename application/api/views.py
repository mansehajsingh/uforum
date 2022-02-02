from os import stat
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import *
 
from . import constants
from .validation import UserValidator
from .utils import parse_json, hash_password

# Create your views here.

@api_view(["GET"])
def base(request, format=constants.DEFAULT_REQUEST_FORMAT):
    return Response(constants.API_ROUTES, status.HTTP_200_OK)

@api_view(["POST"])
def create_user(request, format=constants.DEFAULT_REQUEST_FORMAT):
    body = parse_json(request.body) # request.body is originally bytes

    try:
        if UserValidator(body["username"], body["full_name"], body["password"]).is_valid(): # if one or more fields are invalid
            if not User.objects.filter(username=body["username"]).exists(): # if the username doesn't already exist
                new_user = User(
                    username=body["username"],
                    full_name=body['full_name'],
                    password=hash_password(body["password"])
                )
                new_user.save() # execute the INSERT statement

                return Response(status=status.HTTP_200_OK)

            else:
                return Response(status=status.HTTP_409_CONFLICT) # 409 conflict between provided username and existing username

        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY) # 422 for invalid input that is not malformed syntactically

    except KeyError: # if the user data did not possess the necessary keys
        return Response(status=status.HTTP_400_BAD_REQUEST)