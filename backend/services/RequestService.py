from backend.repositories.RequestRepository import RequestRepository


class RequestService:


    def list():
        return RequestRepository.list()


    def read(id):
        return RequestRepository.read(id)
   
    def save(client, text):
        request = RequestRepository.save(client, text)
        return request


    def delete(id):
        RequestRepository.delete(id)
