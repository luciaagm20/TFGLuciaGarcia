from django.db import models


class Food(models.Model):
    group_code = models.IntegerField()
    subgroup_code = models.IntegerField()
    group_name = models.TextField(null=True)  
    subgroup_name = models.TextField(null=True)  
    food_code = models.IntegerField()
    food_name = models.TextField()
    water = models.SmallIntegerField(null=True) 
    protein = models.SmallIntegerField(null=True)  
    carbohydrates = models.SmallIntegerField(null=True)  
    fats = models.SmallIntegerField(null=True)  
    sugars = models.SmallIntegerField(null=True)  
    glucose = models.SmallIntegerField(null=True)  
    lactose = models.SmallIntegerField(null=True)

