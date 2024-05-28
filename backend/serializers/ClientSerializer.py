from rest_framework import serializers

from ..models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

    # def create(self, validated_data):
    #     client = ClientService.save(
    #         name=validated_data['name'],
    #         gender=validated_data['gender'],
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         weight=validated_data['weight'],
    #         age=validated_data['age'],
    #         height=validated_data['height'],
    #         number_meals=validated_data['number_meals'],
    #         goal=validated_data['goal'],
    #         allergies=validated_data['allergies']
    #     )
    #     return client