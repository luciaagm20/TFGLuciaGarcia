from backend.models.Allergies import Allergies
from rest_framework import serializers



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergies
        fields = '__all__'