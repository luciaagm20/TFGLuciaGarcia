from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from backend.serializers.ClientSerializer import ClientSerializer
from backend.services.ClientService import ClientService 
from backend.services.MenuService import MenuService

from ..models import *

from rest_framework import status, permissions, viewsets 
from rest_framework.response import Response


class ClientViewSet(viewsets.ModelViewSet):
    queryset = ClientService.listClient()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientSerializer

    def list(self, request):
        clients = ClientService.listClient()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        client = ClientService.read(pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        client = ClientService.save(
            name=data.get('name'),
            gender=data.get('gender'),
            email=data.get('email'),
            password=data.get('password'),
            weight=data.get('weight'),
            age=data.get('age'),
            height=data.get('height'),
            number_meals=data.get('number_meals'),
            goal=data.get('goal'),
            allergies=data.get('allergies')
        )

        # Lógica adicional para crear el menú basado en las alergias
        if client.allergies == 2:
            MenuService.create_weekly_menu_without_lactose(client)
        else:
            MenuService.create_weekly_menu(client)

        serializer = ClientSerializer(client)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        data = request.data
        client = ClientService.update(
            client_id=pk,
            name=data.get('name'),
            email=data.get('email'),
            password=data.get('password'),
            weight=data.get('weight'),
            age=data.get('age'),
            height=data.get('height'),
            goal=data.get('goal'),
            insertion_date=data.get('insertion_date'),
            is_admin=data.get('is_admin'),
            allergies=data.get('allergies')
        )
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        ClientService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)




''' def listClient(request):
    listData = ClientService.listClient()
    context = {
            "db_data": listData[::-1]
        }
    return render(request, 'listClient.html', context)
    
    def createClient(request):
        if request.method == 'POST':
            name = request.POST["username"]
            gender = request.POST["gender"]
            email = request.POST["email"]
            password = request.POST["password"]
            weight = request.POST["weight"]
            age = request.POST["age"]
            height = request.POST["height"]
            number_meals = request.POST["number_meals"]
            goal = request.POST["goal"]
            allergies= request.POST["allergies"]

            client = ClientService.save(name, gender, email, password, weight, age, height, number_meals, goal, allergies)

            if(client.allergies == 2):
                MenuService.create_weekly_menu_without_lactose(client)
            
            else: MenuService.create_weekly_menu(client)
            
            return HttpResponseRedirect(reverse("listClient"))
        else:
            return render(request, 'registration.html') 



    def deleteClient(request, client_id):
        ClientService.delete(client_id)
        return HttpResponseRedirect(reverse("listClient"))

    def profileClient(request, client_id):
        client = ClientService.read(client_id)
        context = {
            "client" : client
        }

        return render(request, 'profileClient.html', context)

    def updateClient(request, client_id):
        if request.method == 'POST':
            client = ClientService.read(client_id)
            # Obtener los datos del formulario enviado por el usuario
            name = request.POST.get("name")
            email = request.POST.get("email")
            password = request.POST.get("password")
            weight = request.POST.get("weight")
            age = request.POST.get("age")
            height = request.POST.get("height")
            number_meals = request.POST.get("number_meals")
            goal = request.POST.get("goal")
            allergies = request.POST.get("allergies")
            

            # Verificar si algún campo se ha modificado
            # if any((name, email, password, weight, age, height, objective, allergies)):
            if (name != client.name or
                email != client.email or
                password != client.password or
                weight != client.weight or
                age != client.age or
                number_meals != client.number_meals or
                height != client.height or
                goal != client.goal or
                allergies != client.allergies):
                # Llamar al método del servicio para actualizar el cliente
                ClientService.update(client_id, name, email, password, weight, age, height, number_meals, goal, client.insertion_date, client.is_admin, allergies)

                # Redirigir a la página de lista de clientes
                return HttpResponseRedirect(reverse("listClient"))
            else:
                # Si ningún campo se ha modificado, volver a la página de perfil del usuario
                return HttpResponseRedirect(reverse("profileClient",  kwargs={'client_id': client_id}))
        else:
            # Obtener los datos del cliente que se va a actualizar
            client = ClientService.read(client_id)

            # Renderizar el formulario de actualización con los datos del cliente
            context = {
                "client": client
            }
            return render(request, 'updateClient.html', context) '''