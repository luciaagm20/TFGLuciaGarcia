from django.urls import path
from . import views

urlpatterns=[
    path('index/', views.index, name='index'),
    path('registration/', views.registration, name='registration'),
    path('listUsers/', views.listUsers, name='listUsers'),
    path('delete/<int:client_id>', views.delete, name='delete'),
    path('login/', views.login, name='login')

]