from django.db import models

class FoodJoin(models.Model):
    food_code_one = models.IntegerField()
    food_code_two = models.IntegerField()
    group_code_one = models.IntegerField()
    group_code_two = models.IntegerField()
    has_lactose = models.BooleanField()
    has_seafood = models.BooleanField()
    has_egg = models.BooleanField()
    calories = models.FloatField()
