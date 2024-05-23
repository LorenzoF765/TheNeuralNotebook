from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import UserInfo, Conversation
from .serializers import UserSerializer, UserInfoSerializer, ConversationSerializer
from .models import *
from .openai_test import *

@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key})
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_saved_conversations(request):
    user = request.user
    saved_conversations = Conversation.objects.filter(user=user)
    serializer = ConversationSerializer(saved_conversations, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def chatView(request):
    message = request.data["msgData"]
    conversation = request.data.get("conversation", [])  # Get the entire conversation
    response = callUponTheAllmightyKai(message, conversation)
    return Response({'response': response})

@api_view(['POST'])
def save_conversation(request):
    user = request.user
    data = request.data
    conversation = Conversation.objects.create(
        user=user,
        conversation_data=data.get('conversation')
    )
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail_view(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            # Retrieve user details
            user = request.user
            user_data = {
                'username': user.username,
                'name': user.userinfo.name,
                'age': user.userinfo.age,
            }
            return JsonResponse(user_data)
        else:
            return JsonResponse({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            # Update user information
            user = request.user
            try:
                # Retrieve user info
                userinfo = user.userinfo
                # Update name if provided
                if 'name' in request.data:
                    userinfo.name = request.data['name']
                # Update age if provided
                if 'age' in request.data:
                    userinfo.age = request.data['age']
                # Save changes
                userinfo.save()
                return JsonResponse({'message': 'User information updated successfully'})
            except UserInfo.DoesNotExist:
                return JsonResponse({'error': 'User information not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'DELETE':
        # Delete user account
        # Implement logic to delete user account
        return JsonResponse({'message': 'User account deleted successfully'})
