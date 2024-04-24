from django.shortcuts import render
from .models import Client, User
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse 
from django.utils import timezone
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login


def index(request):
    context = {}
    return render(request, 'index.html', context)

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # Autenticar al usuario
        user = User.objects.get(name=username)
        
        if user.name == "admin":
                # Si el usuario es administrador, redirigir a la lista de usuarios
            return HttpResponseRedirect(reverse("listUsers"))
        else:
                # Si el usuario no es administrador, redirigir a la página de registro
            return HttpResponseRedirect(reverse("registration"))
    
    '''    try:
            user = User.objects.get(name=username)

            if check_password(password, user.password):
                if(user.name == "admin"):
                    return HttpResponseRedirect(reverse("listUsers"))
                else:
                    return HttpResponseRedirect(reverse("registration"))  
            else:
                
                error_message = "Contraseña incorrecta"
        except User.DoesNotExist:
                
                error_message = "El usuario no existe"
                
        return render(request, 'login.html', {'error_message': error_message})

    else:
        return render(request, 'login.html') '''
        

def listUsers(request):
    db_data = Client.objects.all()
    context = {
        "db_data": db_data[::-1]
    }
    return render(request, 'listUsers.html', context)

def registration(request):
    if request.method == 'POST':
        name = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        weight = request.POST["weight"]
        age = request.POST["age"]
        height = request.POST["height"]
        objective = request.POST["objective"]
        allergies= request.POST["allergies"]

        db_data = Client(name=name, email=email, password=password, weight=weight, age=age, height=height, objective=objective, 
                        insertion_date=timezone.now().date(), is_admin=False, allergies=allergies)
        db_data.save()

        return HttpResponseRedirect(reverse("listUsers"))
    else:
            # Si la solicitud no es POST, renderiza el formulario de registro
        return render(request, 'registration.html')
    

def delete(request, client_id):
    db_data = Client.objects.filter(user_ptr_id=client_id)
    db_data.delete()

    return HttpResponseRedirect(reverse("listUsers"))

        

