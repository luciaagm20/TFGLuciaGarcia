from rest_framework import serializers
from ..models import Requests


class RequestSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)
    class Meta:
        model = Requests
        fields = ['id', 'client_id', 'text']
