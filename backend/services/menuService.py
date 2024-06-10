from backend.repositories.MenuRepository import MenuRepository

class MenuService:
    
     def create_weekly_menu(cliente):
          return MenuRepository.create_weekly_menu(cliente)
     
     def create_weekly_menu_without_lactose(cliente):
          return MenuRepository.create_weekly_menu_without_lactose(cliente)

     def listMenu():
          return MenuRepository.listMenu()

     def read(menu_id):
          return MenuRepository.read(menu_id)

     def delete(id):
          MenuRepository.delete(id)
     
     def list_by_client(id):
          return MenuRepository.list_by_client(id)
     