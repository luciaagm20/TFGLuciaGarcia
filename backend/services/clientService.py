
from django.utils import timezone
from backend.repositories.clientRepository import ClientRepository

class ClientService:
    
     def listClient():
          return ClientRepository.listClient()

     def read(client_id):
          return ClientRepository.read(client_id)


     def save(name, gender, email, password, weight, age, height, goal, allergies):

          #aqui podemos validar campos, hacer logica de app

          client = ClientRepository.save(name, gender, email, password, weight, age, height, goal, timezone.now().date(), False, allergies)
          return client

     def delete(client_id):
          ClientRepository.delete(client_id)

     def update(client_id, name, email, password, weight, age, height, goal, insertion_date, is_admin, allergies):

          print(name)
          print(age)
          client = ClientRepository.update(client_id, name, email, password, weight, age, height, goal, insertion_date, is_admin, allergies)
          return client