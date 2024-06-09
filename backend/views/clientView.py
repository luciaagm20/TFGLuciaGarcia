from backend.serializers.ClientSerializer import ClientSerializer
from backend.services.ClientService import ClientService 

from rest_framework import status, permissions, viewsets 
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class ClientViewSet(viewsets.ModelViewSet):
    # queryset = ClientService.listClient()
    # permission_classes = [permissions.AllowAny]
    serializer_class = ClientSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(ClientViewSet, self).get_permissions()

    def list(self, request):
        clients = ClientService.listClient()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.request.user
        if not user.is_superuser and str(user.id) != pk:
            return Response({"detail": "No permission."}, status=status.HTTP_403_FORBIDDEN)
        
        client = ClientService.read(pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = ClientSerializer(data=data)
        
        if serializer.is_valid():
            client = ClientService.save(
                username=serializer.data.get('username'),
                gender=serializer.data.get('gender'),
                email=serializer.data.get('email'),
                password=serializer.data.get('password'),
                weight=serializer.data.get('weight'),
                age=serializer.data.get('age'),
                height=serializer.data.get('height'),
                number_meals=serializer.data.get('number_meals'),
                goal=serializer.data.get('goal'),
                allergies=serializer.data.get('allergies'), 
                is_superuser=serializer.data.get('is_superuser')
            )

            serializer = ClientSerializer(client)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Si el serializador no es válido, se devuelve un error 400 con los errores del serializador
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        user = self.request.user
        if not user.is_superuser and str(user.id) != pk:
            return Response({"detail": "No permission."}, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data
        serializer = ClientSerializer(data)
        if serializer.is_valid(raise_exception=True):
            client = ClientService.update(
                client_id=pk,
                username=data.get('username'),
                email=data.get('email'),
                password=data.get('password'),
                weight=data.get('weight'),
                age=data.get('age'),
                height=data.get('height'),
                goal=data.get('goal'),
                allergies=data.get('allergies'),
                is_superuser=data.get('is_superuser'),
            )
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user = self.request.user
        if not user.is_superuser and str(user.id) != pk:
            return Response({"detail": "No tienes permiso para realizar esta acción."}, status=status.HTTP_403_FORBIDDEN)

        ClientService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)




