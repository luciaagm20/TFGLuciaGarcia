from rest_framework import serializers
from ..models import *

class FoodSerializer(serializers.ModelSerializer):
    group_code = serializers.IntegerField(required=False)
    subgroup_code = serializers.IntegerField(required=False)
    group_name = serializers.CharField(required=False)  
    subgroup_name = serializers.CharField(required=False)  
    food_name = serializers.CharField(required=False)
    water = serializers.FloatField(required=False) 
    protein = serializers.FloatField(required=False)  
    carbohydrates = serializers.FloatField(required=False)  
    fats = serializers.FloatField(required=False)  
    sugars = serializers.FloatField(required=False)  
    glucose = serializers.FloatField(required=False)  
    lactose = serializers.FloatField(required=False)
    has_lactose = serializers.BooleanField(required=False)
    has_seafood = serializers.BooleanField(required=False)
    has_egg = serializers.BooleanField(required=False)

    class Meta:
        model = Food 
        fields = '__all__'

        # fields = ["id", "food_name", "group_code", "subgroup_code", "group_name", "food_code", "water"]

    # def validate_has_lactose(self, value):
    #     lactose = self.initial_data.get('lactose', None)
    #     if value is not None:
    #         return value
    #     elif lactose > 0.5:
    #         return True
    #     else:
    #         return False
    
    # def validate_has_seafood(self, value):
    #     subgroup_code = self.initial_data.get('subgroup_code', None)
    #     if value is not None:
    #         return value
    #     elif subgroup_code == 407 or subgroup_code == 408:
    #         return True
    #     else:
    #         return False
    
    # def validate_has_egg(self, value):
    #     subgroup_code = self.initial_data.get('subgroup_code', None)
    #     if value is not None:
    #         return value
    #     elif subgroup_code == 410:
    #         return True
    #     else:
    #         return False