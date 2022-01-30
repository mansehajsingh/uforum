from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
 
from . import constants

# Create your views here.

@api_view(["GET"])
def index(request, format=constants.DEFAULT_REQUEST_FORMAT):
    return Response(constants.API_ROUTES, status.HTTP_200_OK)