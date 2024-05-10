from random import choice
from datetime import timedelta, datetime
from ..models import Food, FoodIntake, WeeklyMenu

class MenuRepository:

    @staticmethod
    def create_food_intake(menu_semanal, alimentos):
        dias_semana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        comidas = ['BREAKFAST', 'MEAL', 'DINNER']

        # Categorizar los alimentos
        verduras = alimentos.objects.filter(subgroup_code = 201)
        platos = alimentos.objects.filter(group_code = 1)
        tuberculos = alimentos.objects.filter(subgroup_code = 202)
        legumbres = alimentos.objects.filter(subgroup_code = 203)
        cereales = alimentos.objects.filter(group_code = 3)
        proteinas = alimentos.objects.filter(group_code = 4)
        # grasas_saludables = alimentos.filter(subgroup_code = 205)

        # Iterar sobre cada día de la semana
        for dia in range(7):
            nombre_dia = dias_semana[dia]

            if dia % 2 == 0:  # Día para verdura con hidrato
                # Seleccionar hidrato (tubérculo o cereal)
                hidrato = choice(tuberculos | cereales)

                # Iterar sobre cada comida del día
                for comida in comidas:
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                        alimento_desayuno = choice(alimentos.objects.filter(subgroup_code=204) | alimentos.objects.filter(subgroup_code=502) | alimentos.objects.filter(group_code=7))
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, day_of_week=nombre_dia, meal=comida)
                    elif comida == 'MEAL':
                        alimento_almuerzo = choice(verduras | hidrato | proteinas | platos)
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_almuerzo, day_of_week=nombre_dia, meal=comida)
                    elif comida == 'DINNER':
                        alimento_cena = choice(choice(verduras | proteinas))
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_cena, day_of_week=nombre_dia, meal=comida)
            else:
                for comida in comidas:
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                        alimento_desayuno = choice(alimentos.objects.filter(subgroup_code=204) | alimentos.objects.filter(subgroup_code=502) | alimentos.objects.filter(group_code=7))
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, day_of_week=nombre_dia, meal=comida)
                    elif comida == 'MEAL':
                        alimento_almuerzo = choice(verduras | legumbres | proteinas | platos)
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_almuerzo, day_of_week=nombre_dia, meal=comida)
                    elif comida == 'DINNER':
                        alimento_cena = choice(choice(verduras | proteinas))
                        FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_cena, day_of_week=nombre_dia, meal=comida)


    @staticmethod
    def create_weekly_menu(cliente):
        fecha_actual = datetime.now().date()
        # Calcular el primer día de la semana (lunes)
        fecha_inicio = fecha_actual - timedelta(days=fecha_actual.weekday())
        # Calcular el último día de la semana (domingo)
        fecha_fin = fecha_inicio + timedelta(days=6)


        # Crear el objeto WeeklyMenu para la semana
        menu_semanal = WeeklyMenu.objects.create(client=cliente, start_date=fecha_inicio, end_date=fecha_fin)

        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        MenuRepository.create_food_intake(menu_semanal, alimentos)
        
    @staticmethod
    def create_weekly_menu_without_lactose(cliente):
        fecha_actual = datetime.now().date()
        # Calcular el primer día de la semana (lunes)
        fecha_inicio = fecha_actual - timedelta(days=fecha_actual.weekday())
        # Calcular el último día de la semana (domingo)
        fecha_fin = fecha_inicio + timedelta(days=6)


        # Crear el objeto WeeklyMenu para la semana
        menu_semanal = WeeklyMenu.objects.create(client=cliente, start_date=fecha_inicio, end_date=fecha_fin)

        # Obtener todos los alimentos disponibles sin lactosa 
        alimentos = Food.objects.filter(lactose=0)

        MenuRepository.create_food_intake(menu_semanal, alimentos)


    def viewMenu(client_id):
            # Obtener el menú semanal por su ID
            menu = WeeklyMenu.objects.get(client_id=client_id)
            return menu

    def viewFoodIntake(menu):
            # Obtener todos los alimentos asociados a este menú
            alimentos = FoodIntake.objects.filter(weeklyMenu=menu)
            return alimentos
            
    def listMenu():
        return WeeklyMenu.objects.all()

    def read(food_id):
        return WeeklyMenu.objects.filter(id=food_id)
    
    def delete(food_id):
        db_data = WeeklyMenu.objects.filter(id=food_id)
        db_data.delete()