from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from backend.serializers.FoodSerializer import FoodSerializer
from backend.services.foodService import FoodService 

from rest_framework import viewsets

class ListFood(viewsets.ModelViewSet):
        queryset = FoodService.listFood() 
        serializer_class = FoodSerializer


def listFood(request):
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

    return HttpResponseRedirect(reverse("listFood"))

# def readFood(request, food_id):
#     FoodService.read(food_id)

#     return render(request, 'viewFood.html')
