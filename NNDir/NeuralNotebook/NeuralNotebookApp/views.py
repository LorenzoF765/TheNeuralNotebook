from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status  # Importing status for HTTP status codes
from django.http import JsonResponse
from .models import *
from .openai_test import *


@api_view (['GET'])
def testView(request):
    response = Yippee()    
    return Response({'response': response})

@api_view (['POST'])
def chatView(request):
    message = request.data["msgData"]
    response = callUponTheAllmightyKai(message)
    return Response ({'response': response})


def my_loginData_list(request):
    models = LoginInfo.objects.all()
    data = [{"username": m.username, "password": m.password} for m in models]
    return JsonResponse(data, safe=False)

def my_userData_list(request):
    models = UserInfo.objects.all()
    data = [{"name": m.name, "age": m.age} for m in models]
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def modelGen(request):
    username = request.data.get("username")
    password = request.data.get("password")

    # Check if the username already exists
    if LoginInfo.objects.filter(username=username).exists():
        return Response({
            'response': 'Username is already in use.',
            'success': False
        }, status=status.HTTP_400_BAD_REQUEST)

    # If the username doesn't exist, create a new user account
    LoginInfo.objects.create(username=username, password=password)

    return Response({
        'response': 'Account created successfully!',
        'success': True
    }, status=status.HTTP_201_CREATED)