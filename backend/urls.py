from django.urls import include, path

from .views.FoodIntakeView import *
from .views.LoginView import MyTokenObtainPairView
from .views.IndexView import *
from .views.ClientView import *
from .views.FoodView import *
from .views.MenuView import MenuViewSet
from .views.RequestsView import *
from django.contrib.auth.models import *
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'clients', ClientViewSet, basename='clients')  
router.register(r'food', FoodViewSet, basename='food') 
router.register(r'foodIntake', FoodIntakeViewSet, basename='foodIntake') 
router.register(r'menu', MenuViewSet, basename='menu') 
router.register(r'request', RequestsViewSet, basename='request')



urlpatterns= [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]

