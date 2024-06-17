from django.urls import include, path

from .views.FoodIntakeView import *
from .views.LoginView import MyTokenObtainPairView
from .views.IndexView import *
from .views.ClientView import *
from .views.FoodView import *
from .views.MenuView import *
from django.contrib.auth.models import *
from rest_framework import routers

router = routers.DefaultRouter()
# router = routers.SimpleRouter()

router.register(r'clients', ClientViewSet, basename='clients')  
router.register(r'food', FoodViewSet, basename='food') 
router.register(r'foodIntake', FoodIntakeViewSet, basename='foodIntake') 
router.register(r'menu', MenuViewSet, basename='menu') 

# path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
# path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# path('register/', views.RegisterView.as_view(), name='auth_register'),


urlpatterns= [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]

