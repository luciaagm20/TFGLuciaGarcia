from rest_framework import serializers

from ..models import *

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyMenu
        fields = '__all__'


