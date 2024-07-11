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
        food = FoodService.read(pk)
        serializer = FoodSerializer(food, data=request.data)
        if serializer.is_valid(raise_exception=True):
            food = FoodService.update(
                food_id=pk,
                group_code = serializer.validated_data.get("group_code", food.group_code),
                subgroup_code = serializer.validated_data.get("subgroup_code", food.subgroup_code),
                group_name = serializer.validated_data.get("group_name", food.group_name),
                subgroup_name = serializer.validated_data.get("subgroup_name", food.subgroup_name),
                food_name = serializer.validated_data.get("food_name", food.food_name),
                water = serializer.validated_data.get("water", food.water),
                protein = serializer.validated_data.get("protein", food.protein),
                carbohydrates = serializer.validated_data.get("carbohydrates", food.carbohydrates),
                fats = serializer.validated_data.get("fats", food.fats),
                sugars = serializer.validated_data.get("sugars", food.sugars),
                glucose = serializer.validated_data.get("glucose", food.glucose),
                lactose = serializer.validated_data.get("lactose", food.lactose)
                
            )
            serializer = FoodSerializer(food)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        FoodService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET http://127.0.0.1:8000/api/food/filter-by-group-name/?group_name=beverages
    @action(detail=False, methods=['get'], url_path='filter-by-group-name')
    def filter_by_group_name(self, request):
        group_name = request.query_params.get('group_name')
        if group_name is None:
            return Response({"detail": "group name parameter is required"}, status=400)
        category = FoodService.list_by_group_name(group_name)
        serializer = FoodSerializer(category, many=True)
        return Response(serializer.data)

    
    # POST /api/food/retrieve_multiple/[]
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