from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
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

@api_view (['POST'])
def modelView(request):
    username = request.data["username"]
    password = request.data["password"]
    TestLoginInfo = LoginInfo.objects.create(username=username, password=password)
    return Response ({'response': "hi :D"})

