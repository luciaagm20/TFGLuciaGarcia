from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from ..models import *

class ClientSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    # Poniendo esto ya se asegura de que no puedas poner letras y que age no pueda tener decimales y salta un mensaje de error 
    weight = serializers.FloatField(required=True)  
    age = serializers.IntegerField(required=True)
    height = serializers.FloatField(required=True)
    is_superuser = serializers.BooleanField(required=False, default=0)
    

    class Meta:
        model = Client
        fields = ['id', 'username', 'email', 'password', 'meals', 'weight', 'age', 'height', 'gender', 'activity', 'goal', 'allergies', 'is_superuser']

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")
        return make_password(value)

    def validate_email(self, value):
        request = self.context.get('request', None)
        request = self.context.get('request', None)
        if request:
            if request.method == 'POST':
                if Client.objects.filter(email=value).exists():
                    raise serializers.ValidationError("Email already exists")
        return value

    def validate_username(self, value):
        request = self.context.get('request', None)
        if request:
            if request.method == 'POST':
                if Client.objects.filter(username=value).exists():
                    raise serializers.ValidationError("Username already exists")
        return value
    
    def validate_is_superuser(self, value):
        if value is not None:
            return value
        return False
