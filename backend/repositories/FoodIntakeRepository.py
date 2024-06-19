from ..models import FoodIntake

class FoodIntakeRepository:
     
    def list():
        return FoodIntake.objects.all()

    def read(menu):
        return FoodIntake.objects.filter(weeklyMenu_id=menu).all()
    
    def read_values(menu):
        return FoodIntake.objects.filter(weeklyMenu_id=menu).values('food_id', 'calories', 'day_of_week', 'meal')
        
    def delete(menu):
        db_data = FoodIntake.objects.filter(weeklyMenu_id=menu)
        db_data.delete()