# models.py
from django.contrib.auth.models import User
from django.db import models

class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    def __str__(self):
        return self.name

class LoginInfo(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.username
