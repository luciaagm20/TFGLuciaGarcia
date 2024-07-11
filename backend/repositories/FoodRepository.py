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
        food = Food.objects.get(id=food_id)  # Usar get en lugar de filter para obtener un solo objeto
        return food

    
    def read_array_of_ids(id):
        return Food.objects.get(id=id)

    @staticmethod
    def save(group_code, subgroup_code, group_name, subgroup_name, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose, has_lactose, has_seafood, has_egg):
        food = Food.objects.create(group_code=group_code, subgroup_code=subgroup_code, group_name=group_name, subgroup_name=subgroup_name, food_name=food_name, water=water, protein=protein, carbohydrates=carbohydrates, fats=fats, sugars=sugars, glucose=glucose, lactose=lactose, has_lactose=has_lactose, has_seafood=has_seafood, has_egg=has_egg)
        return food
    
    def delete(food_id):
        db_data = Food.objects.filter(id=food_id)
        db_data.delete()

    @staticmethod
    def update(food_id, group_code, subgroup_code, group_name, subgroup_name, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose, has_lactose, has_seafood, has_egg):
        food = Food.objects.get(id=food_id)

        if group_code != food.group_code:
            food.group_code = group_code
        if subgroup_code != food.subgroup_code:
            food.subgroup_code = subgroup_code
        if group_name != food.group_name:
            food.group_name = group_name
        if subgroup_name != food.subgroup_name:
            food.subgroup_name = subgroup_name
        if food_name != food.food_name:
            food.food_name = food_name
        if water != food.water:
            food.water = water
        if protein != food.protein:
            food.protein = protein
        if carbohydrates != food.carbohydrates:
            food.carbohydrates = carbohydrates
        if fats != food.fats:
            food.fats = fats
        if sugars != food.sugars:
            food.sugars = sugars
        if glucose != food.glucose:
            food.glucose = glucose
        if lactose != food.lactose:
            food.lactose = lactose
        if has_lactose != food.has_lactose:
            food.has_lactose = has_lactose
        if has_seafood != food.has_seafood:
            food.has_seafood = has_seafood
        if has_egg != food.has_egg:
            food.has_egg = has_egg

        food.save()
        return food