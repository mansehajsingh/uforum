from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
 
from . import constants

# Create your views here.

@api_view(["GET"])
def index(request, format="json"):
    return Response(constants.api_routes, status.HTTP_200_OK)