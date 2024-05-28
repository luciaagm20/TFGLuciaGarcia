from django.contrib import admin
from .models import *

admin.site.register(Client)
admin.site.register(Allergies)
admin.site.register(Food)
admin.site.register(FoodIntake)
