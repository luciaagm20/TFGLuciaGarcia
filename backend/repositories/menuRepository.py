from itertools import product
from random import choice
from datetime import timedelta, datetime
from ..models import Food, FoodIntake, WeeklyMenu, FoodJoin
from django.db.models import F, Value
from django.db.models.functions import Abs
from django.db import transaction



class MenuRepository:
    
    @staticmethod
    def find_closest_by_calories(queryset, target_calories):
        closest_number = queryset.annotate(difference=Abs(F('calories') - Value(target_calories))).order_by('difference').first()
        return closest_number
    
    
    def basal_metabolic_rate(client):

        if(client.gender == "Female"):
            caloriasBasales = (10 * int(client.weight)) + (6.25 * int(client.height)) + (5 * int(client.age)) - 161
        else:
            caloriasBasales = (10 * int(client.weight)) + (6.25 * int(client.height)) + (5 * int(client.age)) + 5

        if(client.goal == "Muscle gain"):
            caloriasBasales += 200
        elif(client.goal == "Fat loss"):
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

    def find_closest(queryset, target_calories):
        closest_food = None
        closest_difference = None

        for food in queryset:
            calories = MenuRepository.calculate_kilocal(food)  
            difference = abs(calories - target_calories)

            if closest_difference is None or difference < closest_difference:
                closest_food = food
                closest_difference = difference

        return closest_food

    
    def insertFoodInnerJoin():
        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        # Categorizar los alimentos
        verduras = alimentos.filter(subgroup_code = 201)
        platos = alimentos.filter(group_code = 1)
        proteinas = alimentos.filter(group_code = 4)
        tuberculos = alimentos.filter(subgroup_code = 202)
        legumbres = alimentos.filter(subgroup_code = 203)
        cereales = alimentos.filter(group_code = 3)

        verduras_platos = product(verduras, platos)
        verduras_proteinas = product(verduras, proteinas)
        verduras_legumbres = product(verduras, legumbres)
        tuberculos_proteinas = product(tuberculos, proteinas)
        tuberculos_legumbres = product(tuberculos, legumbres)
        cereales_proteinas = product(cereales, proteinas)
        cereales_platos = product(cereales, platos)

        food_joins = []
        has_lactose = False

        for verdura, plato in verduras_platos:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(plato))
            if(verdura.has_lactose==True or plato.has_lactose==True):
                has_lactose = True
            food_joins.append(FoodJoin(
                food_code_one=verdura.id,
                food_code_two=plato.id,
                group_code_one=verdura.subgroup_code,
                group_code_two=plato.group_code,
                has_lactose=has_lactose,
                has_seafood=False,
                has_egg=False,
                calories=kcal_totales
            ))
            has_lactose = False

        for verdura, proteina in verduras_proteinas:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(proteina))
            if(verdura.has_lactose or proteina.has_lactose):
                has_lactose = True
            food_joins.append(FoodJoin(
                food_code_one=verdura.id,
                food_code_two=proteina.id,
                group_code_one=verdura.subgroup_code,
                group_code_two=proteina.group_code,
                has_lactose=has_lactose,
                has_seafood=proteina.has_seafood,
                has_egg=proteina.has_egg,
                calories=kcal_totales
            ))
            has_lactose = False
        
        for verdura, legumbre in verduras_legumbres:
            kcal_totales = round(MenuRepository.calculate_kilocal(verdura) + MenuRepository.calculate_kilocal(legumbre))
            if(verdura.has_lactose or legumbre.has_lactose):
                has_lactose = True
            food_joins.append(FoodJoin(
                food_code_one=verdura.id,
                food_code_two=legumbre.id,
                group_code_one=verdura.subgroup_code,
                group_code_two=legumbre.subgroup_code,
                has_lactose=has_lactose,
                has_seafood=False,
                has_egg=False,
                calories=kcal_totales
            ))
            has_lactose = False
        
        for tuberculo, proteina in tuberculos_proteinas:
            kcal_totales = round(MenuRepository.calculate_kilocal(tuberculo) + MenuRepository.calculate_kilocal(proteina))
            if(tuberculo.has_lactose or proteina.has_lactose):
                has_lactose = True
            food_joins.append(FoodJoin(
                food_code_one=tuberculo.id,
                food_code_two=proteina.id,
                group_code_one=tuberculo.subgroup_code,
                group_code_two=proteina.group_code,
                has_lactose=has_lactose,
                has_seafood=proteina.has_seafood,
                has_egg=proteina.has_egg,
                calories=kcal_totales
            ))
            has_lactose = False
        
        for tuberculo, legumbre in tuberculos_legumbres:
            kcal_totales = round(MenuRepository.calculate_kilocal(tuberculo) + MenuRepository.calculate_kilocal(legumbre))
            if(tuberculo.has_lactose or proteina.has_lactose):
                has_lactose = True
            food_joins.append(FoodJoin(
                food_code_one=tuberculo.id,
                food_code_two=legumbre.id,
                group_code_one=tuberculo.subgroup_code,
                group_code_two=legumbre.subgroup_code,
                has_lactose=has_lactose,
                has_seafood=False,
                has_egg=False,
                calories=kcal_totales
            ))
            has_lactose = False
        
        for cereal, proteina in cereales_proteinas:
            kcal_totales = round(MenuRepository.calculate_kilocal(proteina) + MenuRepository.calculate_kilocal(proteina))
            food_joins.append(FoodJoin(
                food_code_one=cereal.id,
                food_code_two=proteina.id,
                group_code_one=cereal.group_code,
                group_code_two=proteina.group_code,
                has_lactose=has_lactose,
                has_seafood=proteina.has_seafood,
                has_egg=proteina.has_egg,
                calories=kcal_totales
            ))
            has_lactose = False
        
        for cereal, plato in cereales_platos:
            kcal_totales = round(MenuRepository.calculate_kilocal(cereal) + MenuRepository.calculate_kilocal(plato))
            food_joins.append(FoodJoin(
                food_code_one=cereal.id,
                food_code_two=plato.id,
                group_code_one=cereal.group_code,
                group_code_two=plato.group_code,
                has_lactose=has_lactose,
                has_seafood=False,
                has_egg=False,
                calories=kcal_totales
            ))
            has_lactose = False


        with transaction.atomic():
            FoodJoin.objects.bulk_create(food_joins)

    def create_menu_food_intake(menu_semanal, kcal_breakfast, kcal_lunch, kcal_snack, kcal_dinner, tablas_temporales_comida, tablas_temporales_cena, tablas_temporales_desayuno_snack, nombre_dia, comidas):
        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        # Categorizar los alimentos
        verduras = alimentos.filter(subgroup_code = 201)
        platos = alimentos.filter(group_code = 1)
        tuberculos = alimentos.filter(subgroup_code = 202)
        legumbres = alimentos.filter(subgroup_code = 203)
        cereales = alimentos.filter(group_code = 3)
        proteinas = alimentos.filter(group_code = 4) 

        # Iterar sobre cada comida del día
        for comida in comidas:
        # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
            if comida == 'BREAKFAST' and kcal_breakfast > 0:
                food_breakfast = choice(tablas_temporales_desayuno_snack)
                closest = MenuRepository.find_closest(food_breakfast, kcal_breakfast)
                calories = MenuRepository.calculate_kilocal(closest)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=closest, calories=calories, day_of_week=nombre_dia, meal=comida)

            elif comida == 'SNACK' and kcal_snack > 0:
                food_snack = choice(tablas_temporales_desayuno_snack)
                closest = MenuRepository.find_closest(food_snack, kcal_snack)
                calories = MenuRepository.calculate_kilocal(closest)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=closest, calories=calories, day_of_week=nombre_dia, meal=comida)


            elif comida == 'LUNCH' and kcal_lunch > 0:                            
                food_meal = choice(tablas_temporales_comida)
                closest = MenuRepository.find_closest_by_calories(food_meal, kcal_lunch)
                if(closest.group_code_one == 201):
                    alimento1 = verduras.get(id=closest.food_code_one)
                elif(closest.group_code_one == 202):
                    alimento1 = tuberculos.get(id=closest.food_code_one)
                elif(closest.group_code_one == 3):
                    alimento1 = cereales.get(id=closest.food_code_one)

                if(closest.group_code_two == 1):
                    alimento2 = platos.get(id=closest.food_code_two)
                elif(closest.group_code_two == 4):
                    alimento2 = proteinas.get(id=closest.food_code_two)
                elif(closest.group_code_two == 203):
                    alimento2 = legumbres.get(id=closest.food_code_two)


                caloriasAlimento1 = MenuRepository.calculate_kilocal(alimento1)
                caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento1, calories=caloriasAlimento1, day_of_week=nombre_dia, meal=comida)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)

            elif comida == 'DINNER' and kcal_dinner > 0:
                food_dinner = choice(tablas_temporales_cena)
                closest = MenuRepository.find_closest_by_calories(food_dinner, kcal_dinner)

                if(closest.group_code_one == 201):
                    alimento1 = verduras.get(id=closest.food_code_one)
                elif(closest.group_code_one == 202):
                    alimento1 = tuberculos.get(id=closest.food_code_one)
 
                alimento2 = proteinas.get(id=closest.food_code_two)

                caloriasAlimento1 = MenuRepository.calculate_kilocal(alimento1)
                caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento1, calories=caloriasAlimento1, day_of_week=nombre_dia, meal=comida)
                FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)


    @staticmethod
    def create_food_intake(menu_semanal, caloriasBasales, meals, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                           tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato):
        dias_semana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        comidas = ['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER']

        alimentos = Food.objects.all()

        kcal_breakfast = 0
        kcal_lunch = 0
        kcal_snack = 0
        kcal_dinner = 0
        
        # Verificar combinación: Solo "Breakfast"
        if meals.count() == 1 and meals[0].name_meal == "Breakfast":
            kcal_breakfast = caloriasBasales

        # Verificar combinación: Solo "Lunch"
        elif meals.count() == 1 and meals[0].name_meal == "Lunch":
            kcal_lunch = caloriasBasales

        # Verificar combinación: Solo "Snack"
        elif meals.count() == 1 and meals[0].name_meal == "Snack":
            kcal_snack = caloriasBasales

        # Verificar combinación: Solo "Dinner"
        elif meals.count() == 1 and meals[0].name_meal == "Dinner":
            kcal_dinner = caloriasBasales

        # Verificar combinación: "Breakfast" y "Lunch"
        elif meals.count() == 2 and all(meal in {"Breakfast", "Lunch"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.4
            kcal_lunch = caloriasBasales * 0.6

        # Verificar combinación: "Breakfast" y "Snack"
        elif meals.count() == 2 and all(meal in {"Breakfast", "Snack"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.5
            kcal_snack = caloriasBasales * 0.5

        # Verificar combinación: "Breakfast" y "Dinner"
        elif meals.count() == 2 and all(meal in {"Breakfast", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.4
            kcal_dinner = caloriasBasales * 0.6

        # Verificar combinación: "Lunch" y "Snack"
        elif meals.count() == 2 and all(meal in {"Lunch", "Snack"} for meal in [meal.name_meal for meal in meals]):
            kcal_snack = caloriasBasales * 0.4
            kcal_lunch = caloriasBasales * 0.6

        # Verificar combinación: "Lunch" y "Dinner"
        elif meals.count() == 2 and all(meal in {"Lunch", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_dinner = caloriasBasales * 0.5
            kcal_lunch = caloriasBasales * 0.5

        # Verificar combinación: "Snack" y "Dinner"
        elif meals.count() == 2 and all(meal in {"Snack", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_snack = caloriasBasales * 0.4
            kcal_dinner = caloriasBasales * 0.6

        # Verificar combinación: "Breakfast", "Lunch" y "Snack"
        elif meals.count() == 3 and all(meal in {"Breakfast", "Lunch", "Snack"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.2
            kcal_lunch = caloriasBasales * 0.5
            kcal_snack = caloriasBasales * 0.3

        # Verificar combinación: "Breakfast", "Lunch" y "Dinner"
        elif meals.count() == 3 and all(meal in {"Breakfast", "Lunch", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.2
            kcal_lunch = caloriasBasales * 0.4
            kcal_dinner = caloriasBasales * 0.4

        # Verificar combinación: "Breakfast", "Snack" y "Dinner"
        elif meals.count() == 3 and all(meal in {"Breakfast", "Snack", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.3
            kcal_dinner = caloriasBasales * 0.5
            kcal_snack = caloriasBasales * 0.2

        # Verificar combinación: "Lunch", "Snack" y "Dinner"
        elif meals.count() == 3 and all(meal in {"Lunch", "Snack", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_dinner = caloriasBasales * 0.4
            kcal_lunch = caloriasBasales * 0.4
            kcal_snack = caloriasBasales * 0.2

        # Verificar combinación: "Breakfast", "Lunch", "Snack" y "Dinner"
        elif meals.count() == 4 and all(meal in {"Breakfast", "Lunch", "Snack", "Dinner"} for meal in [meal.name_meal for meal in meals]):
            kcal_breakfast = caloriasBasales * 0.1
            kcal_lunch = caloriasBasales * 0.4
            kcal_snack = caloriasBasales * 0.1
            kcal_dinner = caloriasBasales * 0.4


        tablas_temporales_desayuno_snack = [alimentos.filter(subgroup_code=204), alimentos.filter(subgroup_code=502), alimentos.filter(group_code=7)]
        tablas_temporales_dia_par_comida = [verdura_y_plato, verdura_y_proteina, verdura_y_legumbres]
        tablas_temporales_cena = [tuberculos_y_proteina, verdura_y_proteina]
        tablas_temporales_dia_impar_comida = [cereales_y_proteina, cereales_y_plato, tuberculos_y_proteina, tuberculos_y_legumbres]

        # Iterar sobre cada día de la semana
        for dia in range(7):
            nombre_dia = dias_semana[dia]
            if dia % 2 == 0:  
                MenuRepository.create_menu_food_intake(menu_semanal, kcal_breakfast, kcal_lunch, kcal_snack, kcal_dinner, tablas_temporales_dia_par_comida, tablas_temporales_cena, tablas_temporales_desayuno_snack, nombre_dia, comidas)
            else:
                MenuRepository.create_menu_food_intake(menu_semanal, kcal_breakfast, kcal_lunch, kcal_snack, kcal_dinner, tablas_temporales_dia_impar_comida, tablas_temporales_cena, tablas_temporales_desayuno_snack, nombre_dia, comidas)
                
    
    @staticmethod
    def create_menu(menu_semanal, caloriasBasales, meals, allergies=None):
            print("menu normal")
            if allergies is None:
                allergies = []
        
            print("Creating menu with allergies:", allergies)
            foodJoin = FoodJoin.objects.all()

            # Filtrar por alergias
            if 'lactose' in allergies:
                print("filtro lactosa")
                foodJoin = foodJoin.filter(has_lactose=False)
            if 'seafood' in allergies:
                print("filtro marisco")
                foodJoin = foodJoin.filter(has_seafood=False)
            if 'egg' in allergies:
                print("filtro huevo")
                foodJoin = foodJoin.filter(has_egg=False)

            verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).order_by('calories')
            verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).order_by('calories')
            verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).order_by('calories')
            tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).order_by('calories')
            tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).order_by('calories')
            cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).order_by('calories')
            cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).order_by('calories')

            MenuRepository.create_food_intake(menu_semanal, caloriasBasales, meals, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                                            tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato)
            
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

        meals = cliente.meals.all()

        allergies = cliente.allergies.all()
        allergy_types = [allergy.allergy_type for allergy in allergies]

        has_none = 'None' in allergy_types
        only_celiac = 'Celiac disease' in allergy_types and len(allergy_types) == 1

        if not has_none and not only_celiac:
            # Lista de tipos de alergias para pasar como parámetros
            allergy_params = []
            if 'Celiac disease' in allergy_types:
                allergy_params.append('celiac')
            if 'Lactose intolerant' in allergy_types:
                allergy_params.append('lactose')
            if 'Seafood' in allergy_types:
                allergy_params.append('seafood')
            if 'Egg allergy' in allergy_types:
                allergy_params.append('egg')

            # Llamar al método con las alergias
            MenuRepository.create_menu(menu_semanal, caloriasBasales, meals, allergies=allergy_params)
        else:
            # Llamar al método sin alergias
            MenuRepository.create_menu(menu_semanal, caloriasBasales, meals)
     
            
    def listMenu():
        return WeeklyMenu.objects.all()

    def read(menu_id):
        return WeeklyMenu.objects.get(id=menu_id)
     
    
    def delete(id):
        db_data = WeeklyMenu.objects.filter(id=id)
        db_data.delete()
    
    def list_by_client(client_id):
        return WeeklyMenu.objects.filter(client_id=client_id)