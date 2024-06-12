from django.contrib import admin
from .models import *

# admin.site.register(Client)
admin.site.register(Food)
admin.site.register(FoodIntake)
# admin.site.register(Allergies)

@admin.register(Allergies)
class AllergiesAdmin(admin.ModelAdmin):
    list_display = ['allergy_type']

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'gender', 'activity', 'goal', 'age', 'height', 'weight']
    filter_horizontal = ['allergies', 'groups', 'user_permissions']