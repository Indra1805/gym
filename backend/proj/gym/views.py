from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *
from .permissions import IsSuperUser

# Create your views here.

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id":user.id,
            "username":user.username,
            "email":user.email,
            "phno":user.phno,
            "age":user.age,
            "gender":user.gender,
            "weight":user.weight,
            "is_superuser": user.is_superuser,
            "is_active": user.is_active,
            })
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.filter(is_active=True, is_staff=False)
    serializer_class = UserListSerializer
    permission_classes = [IsSuperUser]


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [IsAdminUser]

class AssignWorkoutView(generics.GenericAPIView):
    serializer_class = AssignWorkoutSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = serializer.validated_data["user_id"]
        workout_ids = serializer.validated_data["workout_ids"]

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        workouts = Workout.objects.filter(id__in=workout_ids)
        user.workouts.set(workouts)
        return Response({"message": "Workouts assigned successfully"})