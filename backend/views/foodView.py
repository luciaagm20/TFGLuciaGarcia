from backend.serializers.FoodSerializer import FoodSerializer
from backend.services.FoodService import FoodService 

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class FoodViewSet(viewsets.ModelViewSet):
    # queryset = FoodService.listFood()
    # permission_classes = [permissions.AllowAny]
    # serializer_class = FoodSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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
        food = FoodService.save(
            group_code = data.get("group_code"),
            subgroup_code = data.get("subgroup_code"),
            group_name = data.get("group_name"),
            subgroup_name = data.get("subgroup_name"),
            food_code = data.get("food_code"),
            food_name = data.get("food_name"),
            # water = data.get("water"),
            protein = data.get("protein"),
            carbohydrates = data.get("carbohydrates"),
            fats = data.get("fats"),
            sugars = data.get("sugars"),
            glucose = data.get("glucose"),
            lactose = data.get("lactose")
        )
        serializer = FoodSerializer(food)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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


''' def listFood(request):
    listData = FoodService.listFood()
    context = {
            "db_data": listData[::-1]
        }
    return render(request, 'listFood.html', context)

def createFood(request):
    if request.method == 'POST':
        group_code = request.POST.get("group_code")
        subgroup_code = request.POST.get("subgroup_code")
        group_name = request.POST.get("group_name")
        subgroup_name = request.POST.get("subgroup_name")
        food_code = request.POST.get("food_code")
        food_name = request.POST.get("food_name")
        water = request.POST.get("water")
        protein = request.POST.get("protein")
        carbohydrates = request.POST.get("carbohydrates")
        fats = request.POST.get("fats")
        sugars = request.POST.get("sugars")
        glucose = request.POST.get("glucose")
        lactose = request.POST.get("lactose")

        FoodService.save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name,
                         water, protein, carbohydrates, fats, sugars, glucose, lactose)

        return HttpResponseRedirect(reverse("listFood"))
    else:
        return render(request, 'createFood.html')


def deleteFood(request, food_id):
    FoodService.delete(food_id)

    return HttpResponseRedirect(reverse("listFood")) '''

# def readFood(request, food_id):
#     FoodService.read(food_id)

#     return render(request, 'viewFood.html')
