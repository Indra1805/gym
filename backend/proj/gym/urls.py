from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

# create your gym requests here

router = DefaultRouter()
router.register("workouts", WorkoutViewSet, basename="workout")

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path('user/', UserInfoView.as_view(), name='user_info'),
    path("admin/users/", UserListView.as_view(), name="admin-users"),
    path("admin/assign-workouts/", AssignWorkoutView.as_view(), name="assign-workouts"),
    path("", include(router.urls)),
]