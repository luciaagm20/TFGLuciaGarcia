from django.db import models


class Food(models.Model):
    group_code = models.IntegerField(null=True)
    subgroup_code = models.IntegerField(null=True)
    group_name = models.TextField(null=True)  
    subgroup_name = models.TextField(null=True)  
    food_code = models.IntegerField(null=True)
    food_name = models.TextField(null=True)
    # water = models.SmallIntegerField(null=True) 
    protein = models.SmallIntegerField(null=True)  
    carbohydrates = models.SmallIntegerField(null=True)  
    fats = models.SmallIntegerField(null=True)  
    sugars = models.SmallIntegerField(null=True)  
    glucose = models.SmallIntegerField(null=True)  
    lactose = models.SmallIntegerField(null=True)

