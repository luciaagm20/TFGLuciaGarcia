from ..models import Requests


class RequestRepository:
     
    def list():
        return Requests.objects.all()


    def read(id):
        return Requests.objects.filter(id=id).all()
   
    @staticmethod
    def save(client, text):
        request = Requests.objects.create(client_id=client, text=text)
        return request
   
       
    def delete(id):
        db_data = Requests.objects.filter(id)
        db_data.delete()
