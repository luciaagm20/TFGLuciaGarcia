from django.urls import include, path
from .views.index import *
from .views.clientView import *
from .views.user import *
from .views.foodView import *
from .views.menuView import *
from django.contrib.auth.models import *
from rest_framework import routers
from backend.views.clientView import ListClient

router = routers.DefaultRouter()
router.register(r'listClient', ListClient, basename='list_client') 
router.register(r'listFood', ListFood, basename='list_food') 

urlpatterns=[
    path('', include(router.urls)),
    path('index/', index, name='index'),
    path('createClient/', createClient, name='createClient'),
    # path('listClient/', listClient, name='listClient'),
    path('deleteClient/<int:client_id>', deleteClient, name='deleteClient'),
    path('profileClient/<int:client_id>', profileClient, name='profileClient'),
    path('updateClient/<int:client_id>', updateClient, name='updateClient'),
    path('login/', login, name='login'),
    path('listFood/', listFood, name='listFood'),
    path('createFood/', createFood, name='createFood'),
    path('deleteFood/', deleteFood, name='deleteFood'),
    path('view_weekly_menu/<int:client_id>', view_weekly_menu, name='view_weekly_menu')

]

