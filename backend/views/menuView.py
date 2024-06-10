from rest_framework.response import Response

from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from backend.serializers.MenuSerializer import MenuSerializer
from backend.services.MenuService import MenuService
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class MenuViewSet(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        menu = MenuService.listMenu()
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        menu = MenuService.read(pk)
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    # GET /api/menu/filter-by-client?id_cliente=<client_id>
    @action(detail=False, methods=['get'], url_path='filter-by-client')
    def filter_by_client(self, request):
        client_id = request.query_params.get('id_cliente')
        if client_id is None:
            return Response({"detail": "id_cliente parameter is required"}, status=400)
        menu = MenuService.list_by_client(client_id)
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
