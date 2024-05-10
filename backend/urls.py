from django.urls import path
from .views.index import *
from .views.clientView import *
from .views.user import *
from .views.foodView import *
from .views.menuView import *

urlpatterns=[
    path('', index, name='index'),
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

]