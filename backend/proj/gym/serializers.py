from rest_framework import serializers
from .models import *

# create your gym serializers here

class RegistrationSerializer(serializers.ModelSerializer):
    phno = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    age = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    gender = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    weight = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username','email','phno','age','gender','weight','password']

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            phno = validated_data['phno'],
            age = validated_data['age'],
            gender = validated_data['gender'],
            weight = validated_data['weight']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["id", "name"]


class UserListSerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phno', 'age', 'gender', 'weight', 'workouts']


# class WorkoutSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Workout
#         fields = ["id", "name"]

class AssignWorkoutSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    workout_ids = serializers.ListField(child=serializers.IntegerField())
