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
    def save(name, gender, email, password, weight, age, height, goal, insertion_date, is_admin, allergies):
        client = Client.objects.create(name=name, email=email, password=password, insertion_date=insertion_date, is_admin=is_admin, weight=weight, age=age, height=height, gender=gender, goal=goal, allergies=allergies)
        return client
    
    def delete(client_id):
        db_data = Client.objects.filter(user_ptr_id=client_id)
        db_data.delete()

    def update(client_id, name, email, password, weight, age, height, goal, insertion_date, is_admin, allergies):
        client = Client.objects.get(user_ptr_id=client_id)

        if name != client.name:
            client.name = name
        if email != client.email:
            client.email = email
            #client.update(email)
        if password != client.password:
            client.password = password
            #client.update(password)
        if weight != client.weight:
            client.weight = weight
            #client.update(weight)
        if age != client.age:
            client.age = age
            #client.update(age)
        if height != client.height:
            client.height = height
            #client.update(height)
        if goal != client.goal:
            client.goal = goal
            #client.update(objective)
        if allergies != client.allergies:
            client.allergies = allergies
            #client.update(allergies)
        if insertion_date != client.insertion_date:
            client.insertion_date = insertion_date
            #client.update(insertion_date)
        if is_admin != client.is_admin:
            client.is_admin = is_admin
            #client.update(is_admin)
        
        client.save()
  
        return client
        