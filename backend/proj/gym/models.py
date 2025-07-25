from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    GENDER_CHOICES = [
        ('male','Male'),
        ('female','Female'),
    ]
    age = models.PositiveIntegerField(blank=True, null=True)
    phno = models.CharField(max_length=10, blank=True, null=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)

    def __str__(self):
        return self.username
    
class Workout(models.Model):
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User, related_name="workouts", blank=True)

    def __str__(self):
        return self.name