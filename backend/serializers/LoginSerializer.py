from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # token['password'] = user.password

        return token

    def validate(self, attrs):
        # Obtener el username y password del request
        username = attrs.get('username')
        password = attrs.get('password')

        # Autenticar el usuario
        user = authenticate(username=username, password=password)

        if user is None:
            # Lanzar una excepción con el mensaje de error personalizado
            raise serializers.ValidationError('Usuario o contraseña fallido')

        # Si la autenticación es exitosa, llama al método padre para generar el token
        data = super().validate(attrs)

        # Incluir el ID del cliente en la respuesta
        data['client_id'] = user.id

        return data