from backend.repositories.menuRepository import MenuRepository

class MenuService:
    
     def create_weekly_menu(cliente):
            return MenuRepository.create_weekly_menu(cliente)
     
     def create_weekly_menu_without_lactose(cliente):
            return MenuRepository.create_weekly_menu_without_lactose(cliente)
     
     def viewMenu(client_id):
            return MenuRepository.viewMenu(client_id)

     def viewFoodIntake(menu):
            return MenuRepository.viewFoodIntake(menu)

     def listMenu():
          return MenuRepository.listMenu()

     def read(food_id):
          return MenuRepository.read(food_id)

     def save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose):

          #aqui podemos validar campos, hacer logica de app

          food = MenuRepository.save(group_code, subgroup_code, group_name, subgroup_name, food_code, food_name, water, protein, carbohydrates, fats, sugars, glucose, lactose)
          return food

     def delete(food_id):
          MenuRepository.delete(food_id)