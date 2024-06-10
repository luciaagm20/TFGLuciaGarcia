
from backend.repositories.ClientRepository import ClientRepository
from backend.serializers.ClientSerializer import ClientSerializer
from backend.services.MenuService import MenuService

class ClientService:
    
     def listClient():
          return ClientRepository.listClient()

     def read(client_id):
          # try:
          return ClientRepository.read(client_id)
        
        # except Client.DoesNotExist:
        #     raise ClientDoesntExistException()


     def save(username, gender, email, password, weight, age, height, number_meals, goal, allergies, is_superuser):
          client = ClientRepository.save(username, gender, email, password, weight, age, height, number_meals, goal, allergies, is_superuser)
          # Lógica adicional para crear el menú basado en las alergias
          # if client.allergies == 2:
          # MenuService.create_weekly_menu_without_lactose(client)
          # else:
          MenuService.create_weekly_menu(client)

          return client

     def delete(client_id):
          ClientRepository.delete(client_id)

     def update(client_id, username, email, password, weight, age, height, goal, allergies, is_superuser):

          client = ClientRepository.update(client_id, username, email, password, weight, age, height, goal, is_superuser, allergies)
          return client
     
     
     