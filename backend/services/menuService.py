from backend.repositories.MenuRepository import MenuRepository

class MenuService:
    
     def create_weekly_menu(cliente):
          return MenuRepository.create_weekly_menu(cliente)
     
     def create_weekly_menu_without_lactose(cliente):
          return MenuRepository.create_weekly_menu_without_lactose(cliente)

     def listMenu():
          return MenuRepository.listMenu()

     def read(client_id):
          return MenuRepository.read(client_id)

     def delete(id):
          MenuRepository.delete(id)
     