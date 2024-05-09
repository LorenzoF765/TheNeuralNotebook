# views.py
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .openai_test import *


@api_view(['GET'])
def get_saved_conversations(request):
    saved_conversations = Conversation.objects.all()
    data = [{'date': conv.datetime} for conv in saved_conversations]
    return Response(data)

@api_view(['POST'])
def save_conversation(request):
    data = request.data
    date = data.get('date')
    conversation_data = data.get('conversation')
    conversation = Conversation.objects.create(date=date, conversation_data=conversation_data)
    return Response({'success': True})


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid username or password'})

    return JsonResponse({'success': False, 'error': 'Method not allowed'})

@api_view(['GET'])
def testView(request):
    response = Yippee()    
    return Response({'response': response})

@api_view(['POST'])
def chatView(request):
    message = request.data["msgData"]
    conversation = request.data.get("conversation", [])  # Get the entire conversation
    response = callUponTheAllmightyKai(message, conversation)
    return Response({'response': response})

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
