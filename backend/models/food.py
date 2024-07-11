from django.db import models


class Food(models.Model):
    group_code = models.IntegerField(null=True)
    subgroup_code = models.IntegerField(null=True)
    group_name = models.TextField(null=True)  
    subgroup_name = models.TextField(null=True)  
    food_name = models.TextField(null=True)
    water = models.FloatField(null=True) 
    protein = models.FloatField(null=True)  
    carbohydrates = models.FloatField(null=True)  
    fats = models.FloatField(null=True)  
    sugars = models.FloatField(null=True)  
    glucose = models.FloatField(null=True)  
    lactose = models.FloatField(null=True)
    has_lactose = models.BooleanField(default=False)
    has_seafood = models.BooleanField(default=False)
    has_egg = models.BooleanField(default=False)
