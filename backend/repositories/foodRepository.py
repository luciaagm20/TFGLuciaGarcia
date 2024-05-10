from ..models import Food

class FoodRepository:
     
    def listFood():
        return Food.objects.all()

    def read(food_id):
        return Food.objects.filter(id=food_id)

    @staticmethod
    def save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):
        food = Food.objects.create(group_code=group_code, subgroup_code=subgroup_code, group_name=group_name, subgroup_name=subgroup_name, food_code=food_code, food_name=food_name, water=water, protein=protein, carbohydrates=carbohydrates, fats=fats, sugars=sugars, glucose=glucose, lactose=lactose)
        return food
    
    def delete(food_id):
        db_data = Food.objects.filter(id=food_id)
        db_data.delete()

    @staticmethod
    def update(food_id, group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):
        db_data = Food.objects.filter(id=food_id)
        db_data.update(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose)
