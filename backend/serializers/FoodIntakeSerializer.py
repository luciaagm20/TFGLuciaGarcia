from rest_framework import serializers

from backend.models import FoodIntake
from backend.serializers.FoodSerializer import FoodSerializer
from backend.serializers.MenuSerializer import MenuSerializer

class FoodIntakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodIntake
        fields = '__all__'
