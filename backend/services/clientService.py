
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


     def save(username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser):
          if Client.objects.count() == 0:
               MenuService.insertFoodInnerJoin()

          client = ClientRepository.save(username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser)
          # Lógica adicional para crear el menú basado en las alergias
          # ClientService.create_menu(client)
          MenuService.create_weekly_menu(client)

          return client

     def delete(client_id):
          ClientRepository.delete(client_id)

     def update(client_id, username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser):

          client = ClientRepository.update(client_id, username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser)
          return client
     
     
     