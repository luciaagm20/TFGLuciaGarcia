from backend.serializers.ClientSerializer import ClientSerializer
from backend.services.ClientService import ClientService 

from ..models import *

from rest_framework import status, permissions, viewsets 
from rest_framework.response import Response

class AllergyViewSet(viewsets.ModelViewSet):
    queryset = ClientService.listClient()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientSerializer

    def list(self, request):
        clients = ClientService.listClient()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        client = ClientService.read(pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        client = ClientService.save(
            name=data.get('name'),
            gender=data.get('gender'),
            email=data.get('email'),
            password=data.get('password'),
            weight=data.get('weight'),
            age=data.get('age'),
            height=data.get('height'),
            number_meals=data.get('number_meals'),
            goal=data.get('goal'),
            allergies=data.get('allergies')
        )