from rest_framework.exceptions import APIException

class ClientDoesntExist(APIException):
    status_code = 503
    default_detail = 'The client you want to see doesn`t exist'
    default_code = 'client_unavaiable'