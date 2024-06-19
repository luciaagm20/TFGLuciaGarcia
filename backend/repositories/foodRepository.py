from ..models import Food

class FoodRepository:
     
    def listFood():
        return Food.objects.all()
    
    def list_by_group_name(group_name):
        db_data = Food.objects.filter(group_code=1)
        if group_name=="fruits, vegetables, legumes and nuts":
            db_data = Food.objects.filter(group_code=2)
        elif group_name=="cereal products":
            db_data = Food.objects.filter(group_code=3)
        elif group_name=="meat, egg and fish":
            db_data = Food.objects.filter(group_code=4)
        elif group_name=="milk and milk products":
            db_data = Food.objects.filter(group_code=5)
        elif group_name==("beverages"):
            db_data = Food.objects.filter(group_code=6)
        elif group_name=="sugar and confectionery":
            db_data = Food.objects.filter(group_code=7)
        elif group_name=="ice cream and sorbet":
            db_data = Food.objects.filter(group_code=8)
        elif group_name=="fats and oils":
            db_data = Food.objects.filter(group_code=9)
        elif group_name=="miscellaneous":
            db_data = Food.objects.filter(group_code=10)
        return db_data

    def read(food_id):
        # return Food.objects.filter(id=food_id)
        try:
            food = Food.objects.get(id=food_id)  # Usar get en lugar de filter para obtener un solo objeto
            return food
        except Food.DoesNotExist:
            return None
    
    def read_array_of_ids(id):
        return Food.objects.get(id=id)

    @staticmethod
    def save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose, has_lactose, has_seafood, has_egg):
        food = Food.objects.create(group_code=group_code, subgroup_code=subgroup_code, group_name=group_name, subgroup_name=subgroup_name, food_code=food_code, food_name=food_name, water=water, protein=protein, carbohydrates=carbohydrates, fats=fats, sugars=sugars, glucose=glucose, lactose=lactose, has_lactose=has_lactose, has_seafood=has_seafood, has_egg=has_egg)
        return food
    
    def delete(food_id):
        db_data = Food.objects.filter(id=food_id)
        db_data.delete()

    @staticmethod
    def update(food_id, group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):
        db_data = Food.objects.filter(id=food_id)
        db_data.update(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose)
