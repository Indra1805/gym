from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username','email','phno','age','gender','weight']

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['id','name']