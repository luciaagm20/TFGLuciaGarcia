from django.db import models


class Food(models.Model):
    group_code = models.IntegerField()
    subgroup_code = models.IntegerField()
    group_name = models.TextField()
    subgroup_name = models.TextField()
    food_code = models.IntegerField()
    food_name = models.TextField()
    water = models.SmallIntegerField()
    protein = models.SmallIntegerField()
    carbohydrates = models.SmallIntegerField()
    fats = models.SmallIntegerField()
    sugars = models.SmallIntegerField()
    glucose = models.SmallIntegerField()
    lactose = models.SmallIntegerField()

