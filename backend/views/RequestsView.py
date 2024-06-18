from rest_framework import generics
from ..models import Requests
from backend.serializers.RequestSerializer import RequestSerializer
from rest_framework import status, viewsets
from backend.services.RequestService import RequestService
from backend.services.ClientService import ClientService
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response




class RequestsViewSet(viewsets.ModelViewSet):
    queryset = RequestService.list()
    serializer_class = RequestSerializer


    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    def list(self, request):
        text = RequestService.list()
        serializer = RequestSerializer(text, many=True)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
        # client_id = self.kwargs['client_id']
        client = ClientService.read(pk)
        user = self.request.user
        if not user.is_superuser:
            return Response({"detail": "No permission."}, status=status.HTTP_403_FORBIDDEN)
       
        text = RequestService.read(pk)
        serializer = RequestSerializer(text)
        return Response(serializer.data)


    def create(self, request):
        client_data = request.data.get('client')  
        text = request.data.get('text', '')
        data = request.data
        serializer = RequestSerializer(data=data)
       
        if serializer.is_valid():
            text = RequestService.save(
                client_data,
                text=serializer.validated_data.get('text'),
            )


            serializer = RequestSerializer(text)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Si el serializador no es válido, se devuelve un error 400 con los errores del serializador
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk=None):
        user = self.request.user
        if not user.is_superuser:
            return Response({"detail": "No tienes permiso para realizar esta acción."}, status=status.HTTP_403_FORBIDDEN)


        RequestService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
