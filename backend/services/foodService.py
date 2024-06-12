from django.utils import timezone
from backend.repositories.FoodRepository import FoodRepository

class FoodService:
    
     def listFood():
          return FoodRepository.listFood()

     def list_by_group_name(group_name):
          return FoodRepository.list_by_group_name(group_name)

     def read(food_id):
          return FoodRepository.read(food_id)

     def save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):

          #aqui podemos validar campos, hacer logica de app

          food = FoodRepository.save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose)
          return food

     def delete(food_id):
          FoodRepository.delete(food_id)

     def update(food_id, group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):
          food = FoodRepository.update(food_id, group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose)
          return food