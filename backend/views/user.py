from django.shortcuts import render
from ..models import Client, User
from django.http import HttpResponseRedirect
from django.urls import reverse 
from django.utils import timezone

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

    #     # Autenticar al usuario
    #     user = User.objects.get(name=username)
        
    #     if user.name == "admin":
    #             # Si el usuario es administrador, redirigir a la lista de usuarios
    #         return HttpResponseRedirect(reverse("listUsers"))
    #     else:
    #             # Si el usuario no es administrador, redirigir a la página de registro
    #         return HttpResponseRedirect(reverse("registration"))
    
        try:
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
        return render(request, 'login.html')