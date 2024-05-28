
from backend.repositories.ClientRepository import ClientRepository
from backend.serializers.ClientSerializer import ClientSerializer

class ClientService:
    
     def listClient():
          return ClientRepository.listClient()

     def read(client_id):
          return ClientRepository.read(client_id)


     # def save(name, gender, email, password, weight, age, height, number_meals, goal, allergies):

     #      #aqui podemos validar campos, hacer logica de app

     #      client = ClientRepository.save(name, gender, email, password, weight, age, height, number_meals, goal, timezone.now().date(), False, allergies)
     #      return client

     def delete(client_id):
          ClientRepository.delete(client_id)

     # def update(client_id, name, email, password, weight, age, height, goal, insertion_date, is_admin, allergies):

     #      client = ClientRepository.update(client_id, name, email, password, weight, age, height, goal, insertion_date, is_admin, allergies)
     #      return client
     
     @staticmethod
     def save(**kwargs):
        serializer = ClientSerializer(data=kwargs)
        if serializer.is_valid(raise_exception=True):
            client = serializer.save()
            return client
        raise ValueError("Invalid data")

     @staticmethod
     def update(client_id, **kwargs):
        client = ClientService.read(client_id)
        serializer = ClientSerializer(client, data=kwargs, partial=True)
        if serializer.is_valid(raise_exception=True):
            client = serializer.save()
            return client
        raise ValueError("Invalid data")