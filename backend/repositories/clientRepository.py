from ..models import Client
from ..exceptions import ClientDoesntExistException

class ClientRepository:
     
    def listClient():
        return Client.objects.all()

    def read(client_id):
            client = Client.objects.get(id=client_id)
            return client
        
    @staticmethod
    def save(username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser):
        client = Client.objects.create(username=username, email=email, password=password, is_superuser=is_superuser, weight=weight, age=age, height=height, gender=gender, goal=goal)
        client.allergies.set(allergies)
        client.meals.set(meals)
        return client
    
    def delete(client_id):
        db_data = Client.objects.filter(id=client_id)
        db_data.delete()

    def update(client_id, username, gender, email, password, weight, age, height, meals, goal, allergies, is_superuser):
        client = Client.objects.get(id=client_id)

        if username != client.username:
            client.username = username
        if gender != client.gender:
            client.gender = gender
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
        if meals != client.meals.all():
            client.meals.set(meals)
        if goal != client.goal:
            client.goal = goal
        if allergies != client.allergies.all():
            client.allergies.set(allergies)
        if is_superuser != client.is_superuser:
            client.is_superuser = is_superuser
            
        client.save()
  
        return client
        