from itertools import chain, product
from random import choice
from datetime import timedelta, datetime
from ..models import Food, FoodIntake, WeeklyMenu
from celery import shared_task


class MenuRepository:

    def find_closest_number(dictionary, calories):
        closest_number = min(dictionary.keys(), key=lambda x: abs(x - calories))
    
        diccionario_resultado = {closest_number: dictionary[closest_number]}
        return diccionario_resultado
    
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


        verduras_platos = product(verduras, platos)
        
        verduras_platos_kcal = []
        kcal_dict = {}

        for verdura, plato in verduras_platos:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(plato))
            verduras_platos_kcal.append((verdura, plato, kcal_totales))

            if kcal_totales not in kcal_dict:
                kcal_dict[kcal_totales] = []

            kcal_dict[kcal_totales].append([verdura.id, plato.id])

        print(kcal_dict)
        # Porcentaje de kilocalorias por comida
        kcal_desayuno = caloriasBasales * 0.2
        kcal_comida = caloriasBasales * 0.4
        kcal_cena = caloriasBasales * 0.4


        # Iterar sobre cada día de la semana
        for dia in range(7):
            nombre_dia = dias_semana[dia]

            if dia % 2 == 0:  # Día para verdura con hidrato
                # Seleccionar hidrato (tubérculo o cereal)
                hidrato = choice(tuberculos or cereales)

                # Iterar sobre cada comida del día
                for comida in comidas:
                    calories = 0
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                        while(calories < kcal_desayuno):
                            alimento_desayuno = choice(alimentos.filter(subgroup_code=204) or alimentos.filter(subgroup_code=502) or alimentos.filter(group_code=7))
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_desayuno)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            calories += caloriasAlimento

                    elif comida == 'MEAL':
                        while(calories < kcal_comida):
                            minimo = MenuRepository.find_closest_number(kcal_dict, kcal_comida)
                            # alimento_almuerzo = [(verdura, plato, kcal_totales) for verdura, plato, kcal_totales in verduras_platos_kcal if kcal_totales == minimo]                            
                            alimento = verduras.get(id=minimo[0][0])
                            alimento2 = platos.get(id=minimo[0][0])
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)
                            calories += alimento_almuerzo[2]

                    elif comida == 'DINNER':
                        while(calories < kcal_cena):
                            alimento_cena = choice(verduras or proteinas)
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_cena)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_cena, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            calories += caloriasAlimento
            else:
                for comida in comidas:
                    calories = 0
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                        while(calories < kcal_desayuno):
                            alimento_desayuno = choice(alimentos.filter(subgroup_code=204) or alimentos.filter(subgroup_code=502) or alimentos.filter(group_code=7))
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_desayuno)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            calories += caloriasAlimento
                    elif comida == 'MEAL':
                        while(calories < kcal_comida):
                            alimento_almuerzo = choice(verduras or legumbres or proteinas or platos)
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_almuerzo)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_almuerzo, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            calories += caloriasAlimento
                    elif comida == 'DINNER':
                        while(calories < kcal_cena):
                            alimento_cena = choice(verduras or proteinas)
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_cena)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_cena, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)
                            calories += caloriasAlimento


    @staticmethod
    @shared_task
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