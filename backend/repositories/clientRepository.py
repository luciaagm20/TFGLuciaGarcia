from ..models import Client
from ..exceptions import ClientDoesntExistException

class ClientRepository:
     
    def listClient():
        return Client.objects.all()

    def read(client_id):
            client = Client.objects.get(id=client_id)
            return client
        
    @staticmethod
    def save(username, gender, email, password, weight, age, height, number_meals, goal, allergies, is_superuser):
        client = Client.objects.create(username=username, email=email, password=password, is_superuser=is_superuser, weight=weight, age=age, height=height, gender=gender, number_meals=number_meals, goal=goal, allergies=allergies)
        return client
    
    def delete(client_id):
        db_data = Client.objects.filter(id=client_id)
        db_data.delete()

    def update(client_id, username, email, password, weight, age, height, number_meals, goal, is_superuser, allergies):
        client = Client.objects.get(user_ptr_id=client_id)

        if username != client.username:
            client.username = username
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
        if is_superuser != client.is_superuser:
            client.is_superuser = is_superuser
        
        client.save()
  
        return client
        