from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from ..models import *

class ClientSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)

    class Meta:
        model = Client
        fields = ['name', 'email', 'password', 'number_meals', 'weight', 'age', 'height', 'gender', 'activity', 'goal', 'allergies']
        # extra_kwargs = {
        #     'password': {'write_only': True},
        # }

    def validate_password(self, value):
        return make_password(value)

    def validate_email(self, value):
        if Client.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
        
