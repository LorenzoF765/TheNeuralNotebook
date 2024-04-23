from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
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





