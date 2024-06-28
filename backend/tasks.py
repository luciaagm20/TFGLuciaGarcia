# menu/tasks.py
from celery import shared_task
from .models import Client
from backend.services.MenuService import MenuService
from backend.serializers.MenuSerializer import MenuSerializer

@shared_task
def create_weekly_menu():
    try:
        clients = Client.objects.all()
        for client in clients:
            try:
                menu = MenuService.create_weekly_menu(client)
                serializer = MenuSerializer(menu)
            except Exception as e:
                print(f"Error creating menu for client {client.id}: {e}")
    except Exception as e:
        print(f"Error fetching clients: {e}")
