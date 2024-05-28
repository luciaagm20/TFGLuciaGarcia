from ..models import Allergies

class AllergyRepository:
     
    def listAllergies():
        return Allergies.objects.all()

    @staticmethod
    def save(text):
        client = Allergies.objects.create(text=text)
        return client
    
    def delete(client_id):
        db_data = Allergies.objects.filter(user_ptr_id=client_id)
        db_data.delete()

   
        