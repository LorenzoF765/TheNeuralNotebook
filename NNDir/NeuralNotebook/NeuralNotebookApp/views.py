from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .openai_test import Yippee

@api_view (['GET'])
def testView(request):
    response = Yippee()    
    return Response({'response': response})




