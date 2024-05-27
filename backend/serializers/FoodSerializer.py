from rest_framework import serializers
from ..models import *

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food 
        fields = '__all__'

        # fields = ["id", "food_name", "group_code", "subgroup_code", "group_name", "food_code", "water"]

        extra_kwargs = {
            'group_code': {'required': False},
            'subgroup_code': {'required': False},
            'group_name': {'required': False},
            'subgroup_name': {'required': False},
            'food_code': {'required': False},
            'food_name': {'required': False},
            # 'water': {'required': False},
            'protein': {'required': False},
            'carbohydrates': {'required': False},
            'fats': {'required': False},
            'sugars': {'required': False},
            'glucose': {'required': False},
            'lactose': {'required': False},
            'columnaLactosa': {'required': False}
        }