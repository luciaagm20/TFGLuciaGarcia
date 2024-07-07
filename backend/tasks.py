# menu/tasks.py
from celery import shared_task
from .models import Client, FoodJoin
from backend.services.ClientService import ClientService
from backend.services.MenuService import MenuService
from backend.serializers.MenuSerializer import MenuSerializer

@shared_task
def create_weekly_menu():
    try:
        FoodJoin.objects.all().delete()
        MenuService.insertFoodInnerJoin()

        clients = ClientService.listClient()
        for client in clients:
            try:
                if not client.is_superuser:
                    menu = MenuService.create_weekly_menu(client)
                    serializer = MenuSerializer(menu)

            except Exception as e:
                print(f"Error creating menu for client {client.id}: {e}")
    except Exception as e:
        print(f"Error fetching clients: {e}")
