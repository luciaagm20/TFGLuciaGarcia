from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from backend.services.menuService import MenuService

def view_weekly_menu(request, client_id):
    menu = MenuService.viewMenu(client_id)
    alimento = MenuService.viewFoodIntake(menu)
    return render(request, 'menu.html', {'menu': menu, 'alimento': alimento})