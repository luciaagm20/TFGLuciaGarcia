from backend.serializers.FoodSerializer import FoodSerializer
from backend.services.FoodService import FoodService 

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class FoodViewSet(viewsets.ModelViewSet):
    queryset = FoodService.listFood()
    permission_classes = [permissions.AllowAny]
    serializer_class = FoodSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        food = FoodService.listFood()
        serializer = FoodSerializer(food, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        food = FoodService.read(pk)
        serializer = FoodSerializer(food)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = FoodSerializer(data=data)
        if serializer.is_valid():
            food = FoodService.save(
                group_code = serializer.data.get("group_code"),
                subgroup_code = serializer.data.get("subgroup_code"),
                group_name = serializer.data.get("group_name"),
                subgroup_name = serializer.data.get("subgroup_name"),
                food_code = serializer.data.get("food_code"),
                food_name = serializer.data.get("food_name"),
                water = serializer.data.get("water"),
                protein = serializer.data.get("protein"),
                carbohydrates = serializer.data.get("carbohydrates"),
                fats = serializer.data.get("fats"),
                sugars = serializer.data.get("sugars"),
                glucose = serializer.data.get("glucose"),
                lactose = serializer.data.get("lactose")
            )
            serializer = FoodSerializer(food)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Si el serializador no es válido, se devuelve un error 400 con los errores del serializador
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        data = request.data
        food = FoodService.update(
            id=pk,
            group_code = data.get("group_code"),
            subgroup_code = data.get("subgroup_code"),
            group_name = data.get("group_name"),
            subgroup_name = data.get("subgroup_name"),
            food_code = data.get("food_code"),
            food_name = data.get("food_name"),
            water = data.get("water"),
            protein = data.get("protein"),
            carbohydrates = data.get("carbohydrates"),
            fats = data.get("fats"),
            sugars = data.get("sugars"),
            glucose = data.get("glucose"),
            lactose = data.get("lactose")
        )
        serializer = FoodSerializer(food)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        FoodService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET /api/food/filter-by-group-name?group_name=<group_name>
    @action(detail=False, methods=['get'], url_path='filter-by-group-name')
    def filter_by_category(self, request):
        group_name = request.query_params.get('group_name')
        if group_name is None:
            return Response({"detail": "group name parameter is required"}, status=400)
        category = FoodService.list_by_group_name(group_name)
        serializer = FoodSerializer(category, many=True)
        return Response(serializer.data)

    
    # /api/food/retrieve_multiple/[]
    @action(detail=False, methods=['post'])
    def retrieve_multiple(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response({"error": "No IDs provided"}, status=400)
        
        foods = [FoodService.read_array_of_ids(pk) for pk in ids]
        food_list = []
        for food in foods:
            food_list.append({'id': food.id, 'name': food.food_name})  
        return Response(food_list)