from django.utils import timezone
from backend.repositories.AllergyRepository import AllergyRepository

class ClientService:
    
     def listClient():
          return AllergyRepository.listClient()

     def read(client_id):
          return AllergyRepository.read(client_id)


     def save(name, gender, email, password, weight, age, height, number_meals, goal, allergies):

          #aqui podemos validar campos, hacer logica de app

          client = AllergyRepository.save(name, gender, email, password, weight, age, height, number_meals, goal, timezone.now().date(), False, allergies)
          return client

     def delete(client_id):
          AllergyRepository.delete(client_id)

    