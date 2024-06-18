from django.db import models


class Meal(models.Model):
    Breakfast = 'Breakfast'
    Lunch = 'Lunch'
    Snack = 'Snack'
    Dinner = 'Dinner'

    CHOICES = (
        (Breakfast, 'Breakfast'),
        (Lunch, 'Lunch'),
        (Snack, 'Snack'),
        (Dinner, 'Dinner'),
    ) 

    name_meal = models.CharField(primary_key=True, max_length=50, choices=(CHOICES))

    def __str__(self):
        return self.name_meal