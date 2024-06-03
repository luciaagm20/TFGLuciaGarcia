from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from ..models import *

class ClientSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    # Poniendo esto ya se asegura de que no puedas poner letras y que age no pueda tener decimales y salta un mensaje de error 
    weight = serializers.FloatField(required=True)  
    age = serializers.IntegerField(required=True)
    height = serializers.FloatField(required=True)
    is_admin = serializers.BooleanField(required=False)


    class Meta:
        model = Client
        fields = ['name', 'email', 'password', 'number_meals', 'weight', 'age', 'height', 'gender', 'activity', 'goal', 'allergies', 'is_admin']

    def validate_password(self, value):
        return make_password(value)

    def validate_email(self, value):
        if Client.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
        
    def validate_name(self, value):
        if Client.objects.filter(name = value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_username(self, value):
        if Client.objects.filter(name = value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")
        return value
    
    def validate_is_admin(self, value):
        if (value and (value == 'true')):
            return True 
        else:
            return False
    
    # def validate(self, data):
    #     password = data.get('password')
    #     if password and len(password) < 8:
    #         raise serializers.ValidationError("Password must be at least 8 characters.")
        
    #     return data