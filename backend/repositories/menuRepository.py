from itertools import chain, product
from random import choice
from datetime import timedelta, datetime
from ..models import Food, FoodIntake, WeeklyMenu, FoodJoin
from django.db.models import F, Value
from django.db.models.functions import Abs


class MenuRepository:
    
    @staticmethod
    def find_closest_by_calories(queryset, target_calories):
        closest_number = queryset.annotate(difference=Abs(F('calories') - Value(target_calories))).order_by('difference').first()
        return closest_number
    
    def basal_metabolic_rate(client):
        if(client.gender == "FEMALE"):
            caloriasBasales = (10 * int(client.weight)) + (6.25 * int(client.height)) + (5 * int(client.age)) - 161
        else:
            caloriasBasales = (10 * int(client.weight)) + (6.25 * int(client.height)) + (5 * int(client.age)) + 5

        
        if(client.goal == 2):
            caloriasBasales += 200
        elif(client.goal == 3):
            caloriasBasales -= 500

        return caloriasBasales
    
    def calculate_kilocal(food):

        protein = food.protein
        carbohydrates = food.carbohydrates
        fats = food.fats

        kcal_protein = 0
        kcal_carbohydrates = 0
        kcal_fats = 0

        if protein:
            kcal_protein = protein * 4
        if carbohydrates:
            kcal_carbohydrates = carbohydrates * 4
        if fats:
            kcal_fats = fats * 9

        # Sumar las kilocalorías de los macronutrientes
        total_kcal = (kcal_protein + kcal_carbohydrates + kcal_fats) * 2

        return total_kcal
    
    def insertFoodInnerJoin():
        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        # Categorizar los alimentos
        verduras = alimentos.filter(subgroup_code = 201)
        platos = alimentos.filter(group_code = 1)
        proteinas = alimentos.filter(group_code = 4)

        verduras_platos = product(verduras, platos)
        verduras_proteinas = product(verduras, proteinas)

        for verdura, plato in verduras_platos:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(plato))
            FoodJoin.objects.create(food_code_one=verdura.id, food_code_two=plato.id, group_code_one=verdura.subgroup_code, group_code_two=plato.group_code, calories=kcal_totales)

        for verdura, proteina in verduras_proteinas:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(proteina))
            FoodJoin.objects.create(food_code_one=verdura.id, food_code_two=proteina.id, group_code_one=verdura.group_code, group_code_two=proteina.group_code, calories=kcal_totales)

    @staticmethod
    def create_food_intake(menu_semanal, caloriasBasales):
        dias_semana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        comidas = ['BREAKFAST', 'MEAL', 'DINNER']

        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        # Categorizar los alimentos
        verduras = alimentos.filter(subgroup_code = 201)
        platos = alimentos.filter(group_code = 1)
        tuberculos = alimentos.filter(subgroup_code = 202)
        legumbres = alimentos.filter(subgroup_code = 203)
        cereales = alimentos.filter(group_code = 3)
        proteinas = alimentos.filter(group_code = 4)

        # MenuRepository.insertFoodInnerJoin()
        
        foodJoin = FoodJoin.objects.all()
        verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).order_by('calories')
        verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).order_by('calories')

        # Porcentaje de kilocalorias por comida
        kcal_breakfast = caloriasBasales * 0.2
        kcal_lunch = caloriasBasales * 0.4
        kcal_dinner = caloriasBasales * 0.4


        # Iterar sobre cada día de la semana
        for dia in range(7):
            nombre_dia = dias_semana[dia]

            if dia % 2 == 0:  # Día para verdura con hidrato

                # Iterar sobre cada comida del día
                for comida in comidas:
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                            food_breakfast = choice(alimentos.filter(subgroup_code=204) or alimentos.filter(subgroup_code=502) or alimentos.filter(group_code=7))
                            calories = MenuRepository.calculate_kilocal(food_breakfast)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=food_breakfast, calories=calories, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'MEAL':
                            food_meal = choice(verdura_y_plato or verdura_y_proteina) 
                            closest = MenuRepository.find_closest_by_calories(food_meal, kcal_lunch)
                            alimento = verduras.get(id=closest.food_code_one)
                            if(closest.group_code_two == 1):
                                alimento2 = platos.get(id=closest.food_code_two)
                            elif(closest.group_code_two == 4):
                                alimento2 = proteinas.get(id=closest.food_code_two)

                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'DINNER':
                            food_dinner = choice(verdura_y_plato or verdura_y_proteina) 
                            closest = MenuRepository.find_closest_by_calories(food_dinner, kcal_dinner)
                            alimento = verduras.get(id=closest.food_code_one)
                            if(closest.group_code_two == 1):
                                alimento2 = platos.get(id=closest.food_code_two)
                            elif(closest.group_code_two == 4):
                                alimento2 = proteinas.get(id=closest.food_code_two)

                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)
            else:
                for comida in comidas:
                    calories = 0
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                            alimento_desayuno = choice(alimentos.filter(subgroup_code=204) or alimentos.filter(subgroup_code=502) or alimentos.filter(group_code=7))
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_desayuno)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'MEAL':
                            food_meal = choice(verdura_y_plato or verdura_y_proteina) 
                            closest = MenuRepository.find_closest_by_calories(food_meal, kcal_lunch)
                            alimento = verduras.get(id=closest.food_code_one)
                            if(closest.group_code_two == 1):
                                alimento2 = platos.get(id=closest.food_code_two)
                            elif(closest.group_code_two == 4):
                                alimento2 = proteinas.get(id=closest.food_code_two)

                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'DINNER':
                            food_dinner = choice(verdura_y_plato or verdura_y_proteina) 
                            closest = MenuRepository.find_closest_by_calories(food_dinner, kcal_dinner)
                            alimento = verduras.get(id=closest.food_code_one)
                            if(closest.group_code_two == 1):
                                alimento2 = platos.get(id=closest.food_code_two)
                            elif(closest.group_code_two == 4):
                                alimento2 = proteinas.get(id=closest.food_code_two)

                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)

    @staticmethod
    def create_weekly_menu(cliente):
        fecha_actual = datetime.now().date()
        # Calcular el primer día de la semana (lunes)
        fecha_inicio = fecha_actual - timedelta(days=fecha_actual.weekday())
        # Calcular el último día de la semana (domingo)
        fecha_fin = fecha_inicio + timedelta(days=6)

        # Crear el objeto WeeklyMenu para la semana
        menu_semanal = WeeklyMenu.objects.create(client=cliente, start_date=fecha_inicio, end_date=fecha_fin)

        caloriasBasales = MenuRepository.basal_metabolic_rate(cliente)

        MenuRepository.create_food_intake(menu_semanal, caloriasBasales)
        
    @staticmethod
    def create_weekly_menu_without_lactose(cliente):
        fecha_actual = datetime.now().date()
        # Calcular el primer día de la semana (lunes)
        fecha_inicio = fecha_actual - timedelta(days=fecha_actual.weekday())
        # Calcular el último día de la semana (domingo)
        fecha_fin = fecha_inicio + timedelta(days=6)

        # Crear el objeto WeeklyMenu para la semana
        menu_semanal = WeeklyMenu.objects.create(client=cliente, start_date=fecha_inicio, end_date=fecha_fin)

        caloriasBasales = MenuRepository.basal_metabolic_rate(cliente)

        MenuRepository.create_food_intake(menu_semanal, caloriasBasales)
            
    def listMenu():
        return WeeklyMenu.objects.all()

    def read(client_id):
        return WeeklyMenu.objects.filter(id=client_id)
    
    def delete(id):
        db_data = WeeklyMenu.objects.filter(id=id)
        db_data.delete()
    