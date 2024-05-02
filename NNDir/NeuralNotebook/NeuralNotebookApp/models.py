from django.db import models

# Create your models here.
class MyModel(models.Model):
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class LoginInfo(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.username
    

class UserInfo(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    associatedUser = models.ForeignKey(LoginInfo, on_delete=models.CASCADE)

    def __str__(self):
        return self.name