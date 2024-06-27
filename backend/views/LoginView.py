from backend.serializers.LoginSerializer import LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data.get('user')
        token = serializer.validated_data.get('access')
        id = serializer.validated_data.get('client_id')

        return Response({
            'access': str(token),
            'client_id': id,  
        })
