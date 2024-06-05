from django.db import models

class FoodJoin(models.Model):
    food_code_one = models.IntegerField()
    food_code_two = models.IntegerField()
    group_code_one = models.IntegerField()
    group_code_two = models.IntegerField()
    calories = models.FloatField()
