from ..models import Client
from ..exceptions import ClientDoesntExistException

class ClientRepository:
     
    def listClient():
        return Client.objects.all()

    def read(client_id):
        try:
            client = Client.objects.get(user_ptr_id=client_id)
            return client
        
        except Client.DoesNotExist:
            raise ClientDoesntExistException()
        
    @staticmethod
    def save(name, gender, email, password, weight, age, height, number_meals, goal, insertion_date, is_admin, allergies):
        client = Client.objects.create(name=name, email=email, password=password, insertion_date=insertion_date, is_admin=is_admin, weight=weight, age=age, height=height, gender=gender, number_meals=number_meals, goal=goal, allergies=allergies)
        return client
    
    def delete(client_id):
        db_data = Client.objects.filter(user_ptr_id=client_id)
        db_data.delete()

    def update(client_id, name, email, password, weight, age, height, number_meals, goal, insertion_date, is_admin, allergies):
        client = Client.objects.get(user_ptr_id=client_id)

        if name != client.name:
            client.name = name
        if email != client.email:
            client.email = email
        if password != client.password:
            client.password = password
        if weight != client.weight:
            client.weight = weight
        if age != client.age:
            client.age = age
        if height != client.height:
            client.height = height
        if number_meals != client.number_meals:
            client.number_meals = number_meals
        if goal != client.goal:
            client.goal = goal
        if allergies != client.allergies:
            client.allergies = allergies
        if insertion_date != client.insertion_date:
            client.insertion_date = insertion_date
        if is_admin != client.is_admin:
            client.is_admin = is_admin
        
        client.save()
  
        return client
        