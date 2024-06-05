from django.urls import include, path

from .views.FoodIntakeView import *

from .views.IndexView import *
from .views.ClientView import *
from .views.UserView import *
from .views.FoodView import *
from .views.MenuView import *
from django.contrib.auth.models import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'clients', ClientViewSet, basename='clients')  
router.register(r'food', FoodViewSet, basename='food') 
router.register(r'foodIntake', FoodIntakeViewSet, basename='foodIntake') 
router.register(r'menu', MenuViewSet, basename='menu') 

''' urlpatterns=[
    path('index/', index, name='index'),
    path('createClient/', createClient, name='createClient'),
    path('listClient/', listClient, name='listClient'),
    path('deleteClient/<int:client_id>', deleteClient, name='deleteClient'),
    path('profileClient/<int:client_id>', profileClient, name='profileClient'),
    path('updateClient/<int:client_id>', updateClient, name='updateClient'),
    path('login/', login, name='login'),
    path('listFood/', listFood, name='listFood'),
    path('createFood/', createFood, name='createFood'),
    path('deleteFood/', deleteFood, name='deleteFood'),
    path('view_weekly_menu/<int:client_id>', view_weekly_menu, name='view_weekly_menu')

] '''

urlpatterns= [
    path('', include(router.urls)),
]

