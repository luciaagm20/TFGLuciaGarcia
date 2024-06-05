from rest_framework.response import Response

from rest_framework import viewsets 


from backend.serializers.MenuSerializer import MenuSerializer
from backend.services.MenuService import MenuService
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class MenuViewSet(viewsets.ModelViewSet):
    # return render(request, 'menu.html', {'menu': menu, 'alimento': alimento})
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        menu = MenuService.listMenu()
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        menu = MenuService.read(pk)
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
