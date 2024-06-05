from rest_framework.response import Response

from rest_framework import viewsets, status


from backend.serializers.FoodIntakeSerializer import FoodIntakeSerializer
from backend.services.FoodIntakeService import FoodIntakeService
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from backend.services.MenuService import MenuService

class FoodIntakeViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        alimento = FoodIntakeService.list()
        serializer = FoodIntakeSerializer(alimento, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        alimento = FoodIntakeService.read(pk)
        serializer = FoodIntakeSerializer(alimento, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        FoodIntakeService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)