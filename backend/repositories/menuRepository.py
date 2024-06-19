from itertools import chain, product
from random import choice, random
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


    @staticmethod
    def create_food_intake(menu_semanal, caloriasBasales, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                           tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato):
        dias_semana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        comidas = ['BREAKFAST', 'LUNCH', 'DINNER']

        # Obtener todos los alimentos disponibles
        alimentos = Food.objects.all()

        # Categorizar los alimentos
        verduras = alimentos.filter(subgroup_code = 201)
        platos = alimentos.filter(group_code = 1)
        tuberculos = alimentos.filter(subgroup_code = 202)
        legumbres = alimentos.filter(subgroup_code = 203)
        cereales = alimentos.filter(group_code = 3)
        proteinas = alimentos.filter(group_code = 4)
        
        foodJoin = FoodJoin.objects.all()

        # verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).order_by('calories')
        # verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).order_by('calories')
        # verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).order_by('calories')
        # tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).order_by('calories')
        # cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).order_by('calories')
        # cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).order_by('calories')
        # tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).order_by('calories')

        # Porcentaje de kilocalorias por comida
        kcal_breakfast = caloriasBasales * 0.2
        kcal_lunch = caloriasBasales * 0.4
        kcal_dinner = caloriasBasales * 0.4

        print("kcal breakfast: " )
        print(kcal_breakfast)
        print("kcal lunch: " )
        print(kcal_lunch)
        print("kcal dinner: " )
        print(kcal_dinner)

        tablas_temporales_dia_par_comida = [verdura_y_plato, verdura_y_proteina, verdura_y_legumbres]
        tablas_temporales_cena = [tuberculos_y_proteina, verdura_y_proteina]
        tablas_temporales_dia_impar_comida = [cereales_y_proteina, cereales_y_plato, tuberculos_y_proteina, tuberculos_y_legumbres]

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
                            print("calorias desayuno: ")
                            print(calories)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=food_breakfast, calories=calories, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'LUNCH':                            
                            food_meal = choice(tablas_temporales_dia_par_comida)
                            closest = MenuRepository.find_closest_by_calories(food_meal, kcal_lunch)
                            print("calorias comida: ")
                            print(closest.calories)
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

                    elif comida == 'DINNER':
                            food_dinner = choice(tablas_temporales_cena)
                            closest = MenuRepository.find_closest_by_calories(food_dinner, kcal_dinner)
                            print("calorias cena: ")
                            print(closest.calories)

                            if(closest.group_code_one == 201):
                                alimento1 = verduras.get(id=closest.food_code_one)
                            elif(closest.group_code_one == 202):
                                alimento1 = tuberculos.get(id=closest.food_code_one)
 
                            alimento2 = proteinas.get(id=closest.food_code_two)

                            caloriasAlimento1 = MenuRepository.calculate_kilocal(alimento1)
                            caloriasAlimento2 = MenuRepository.calculate_kilocal(alimento2)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento1, calories=caloriasAlimento1, day_of_week=nombre_dia, meal=comida)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento2, calories=caloriasAlimento2, day_of_week=nombre_dia, meal=comida)
            else:
                for comida in comidas:
                    calories = 0
                    # Seleccionar un alimento aleatorio de cada grupo/subgrupo según la comida del día
                    if comida == 'BREAKFAST':
                            alimento_desayuno = choice(alimentos.filter(subgroup_code=204) or alimentos.filter(subgroup_code=502) or alimentos.filter(group_code=7))
                            caloriasAlimento = MenuRepository.calculate_kilocal(alimento_desayuno)
                            FoodIntake.objects.create(weeklyMenu=menu_semanal, food=alimento_desayuno, calories=caloriasAlimento, day_of_week=nombre_dia, meal=comida)

                    elif comida == 'LUNCH':
                            food_meal = choice(tablas_temporales_dia_impar_comida)
                            closest = MenuRepository.find_closest_by_calories(food_meal, kcal_lunch)

                            if(closest.group_code_one == 202):
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

                    elif comida == 'DINNER':
                            food_meal = choice(tablas_temporales_cena)
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
    def create_menu_without_lactose(menu_semanal, caloriasBasales):
            print("menu sin lactosa")
            foodJoin = FoodJoin.objects.all()

            verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).filter(has_lactose=False).order_by('calories')
            verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).filter(has_lactose=False).order_by('calories')
            verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).filter(has_lactose=False).order_by('calories')
            tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).filter(has_lactose=False).order_by('calories')
            tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).filter(has_lactose=False).order_by('calories')
            cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).filter(has_lactose=False).order_by('calories')
            cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).filter(has_lactose=False).order_by('calories')

            MenuRepository.create_food_intake(menu_semanal, caloriasBasales, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                                            tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato)
    
    @staticmethod
    def create_menu_without_seafood(menu_semanal, caloriasBasales):
            print("menu sin marisco")
            foodJoin = FoodJoin.objects.all()

            verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).filter(has_seafood=False).order_by('calories')
            verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).filter(has_seafood=False).order_by('calories')
            verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).filter(has_seafood=False).order_by('calories')
            tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).filter(has_seafood=False).order_by('calories')
            tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).filter(has_seafood=False).order_by('calories')
            cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).filter(has_seafood=False).order_by('calories')
            cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).filter(has_seafood=False).order_by('calories')

            MenuRepository.create_food_intake(menu_semanal, caloriasBasales, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                                            tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato)
    
    @staticmethod
    def create_menu_without_egg(menu_semanal, caloriasBasales):
            print("menu sin huevo")
            foodJoin = FoodJoin.objects.all()

            verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).filter(has_egg=False).order_by('calories')
            verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).filter(has_egg=False).order_by('calories')
            verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).filter(has_egg=False).order_by('calories')
            tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).filter(has_egg=False).order_by('calories')
            tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).filter(has_egg=False).order_by('calories')
            cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).filter(has_egg=False).order_by('calories')
            cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).filter(has_egg=False).order_by('calories')

            MenuRepository.create_food_intake(menu_semanal, caloriasBasales, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
                                            tuberculos_y_proteina, tuberculos_y_legumbres, cereales_y_proteina, cereales_y_plato)
    
    @staticmethod
    def create_menu(menu_semanal, caloriasBasales):
            print("menu normal")
            foodJoin = FoodJoin.objects.all()

            verdura_y_plato = foodJoin.filter(group_code_one=201).filter(group_code_two=1).order_by('calories')
            verdura_y_proteina = foodJoin.filter(group_code_one=201).filter(group_code_two=4).order_by('calories')
            verdura_y_legumbres = foodJoin.filter(group_code_one=201).filter(group_code_two=203).order_by('calories')
            tuberculos_y_proteina = foodJoin.filter(group_code_one=202).filter(group_code_two=4).order_by('calories')
            tuberculos_y_legumbres = foodJoin.filter(group_code_one=202).filter(group_code_two=203).order_by('calories')
            cereales_y_proteina = foodJoin.filter(group_code_one=3).filter(group_code_two=4).order_by('calories')
            cereales_y_plato = foodJoin.filter(group_code_one=3).filter(group_code_two=1).order_by('calories')

            MenuRepository.create_food_intake(menu_semanal, caloriasBasales, verdura_y_plato, verdura_y_proteina, verdura_y_legumbres,
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

        allergies = cliente.allergies.all() 
        has_allergy_1 = False
        has_allergy_2 = False
        has_allergy_3 = False
        has_allergy_4 = False
        has_none = False

        if allergies.exists():
            for allergy in allergies:
                if allergy.allergy_type == "Celiac disease":
                    has_allergy_1 = True
                if allergy.allergy_type == "Lactose intolerant":
                    has_allergy_2 = True
                if allergy.allergy_type == "Seafood":
                    has_allergy_3 = True
                if allergy.allergy_type == "Egg allergy":
                    has_allergy_4 = True
        else:
            has_none = True

        if has_allergy_2 and not (has_allergy_1 or has_allergy_3 or has_allergy_4):
            MenuRepository.create_menu_without_lactose(menu_semanal, caloriasBasales)
        elif has_allergy_3 and not (has_allergy_1 or has_allergy_2 or has_allergy_4):
            MenuRepository.create_menu_without_seafood(menu_semanal, caloriasBasales)
        elif has_allergy_4 and not (has_allergy_1 or has_allergy_2 or has_allergy_3):
            MenuRepository.create_menu_without_egg(menu_semanal, caloriasBasales)
        elif has_none:
            MenuRepository.create_menu(menu_semanal, caloriasBasales)
     
            
    def listMenu():
        return WeeklyMenu.objects.all()

    def read(menu_id):
        return WeeklyMenu.objects.get(id=menu_id)
     
    
    def delete(id):
        db_data = WeeklyMenu.objects.filter(id=id)
        db_data.delete()
    
    def list_by_client(client_id):
        return WeeklyMenu.objects.filter(client_id=client_id)