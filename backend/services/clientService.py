
from backend.repositories.ClientRepository import ClientRepository
from backend.serializers.ClientSerializer import ClientSerializer
from backend.services.MenuService import MenuService
from ..models import Client

class ClientService:
    
     def listClient():
          return ClientRepository.listClient()

     def read(client_id):
          # try:
          return ClientRepository.read(client_id)
        
        # except Client.DoesNotExist:
        #     raise ClientDoesntExistException()


     def save(username, gender, email, password, weight, age, height, number_meals, goal, allergies, is_superuser):
          if Client.objects.count() == 0:
               MenuService.insertFoodInnerJoin()

          client = ClientRepository.save(username, gender, email, password, weight, age, height, number_meals, goal, allergies, is_superuser)
          # Lógica adicional para crear el menú basado en las alergias
          # ClientService.create_menu(client)
          MenuService.create_weekly_menu(client)

          return client

     def delete(client_id):
          ClientRepository.delete(client_id)

     def update(client_id, username, email, password, weight, age, height, goal, allergies, is_superuser):

          client = ClientRepository.update(client_id, username, email, password, weight, age, height, goal, is_superuser, allergies)
          return client
     
     def create_menu(client):
          allergies = client.allergies.all() 
          has_allergy_1 = False
          has_allergy_2 = False
          has_allergy_3 = False
          has_allergy_4 = False
          has_allergy_5 = False

          for allergy in allergies:
               if allergy.id == 1:
                    has_allergy_1 = True
               if allergy.id == 2:
                    has_allergy_2 = True
               if allergy.id == 3:
                    has_allergy_3 = True
               if allergy.id == 4:
                    has_allergy_4 = True
               if allergy.id == 5:
                    has_allergy_5 = True

          if has_allergy_2:
              MenuService.create_weekly_menu_without_lactose(client)
               
          elif has_allergy_5:
               MenuService.create_weekly_menu(client)
     
     