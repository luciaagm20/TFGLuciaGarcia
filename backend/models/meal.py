from django.db import models


class Meal(models.Model):
    BREAKFAST = 'Breakfast'
    LUNCH = 'Lunch'
    MEAL = 'Meal'
    SNACK = 'Snack'
    DINNER = 'Dinner'

    CHOICES = (
        (BREAKFAST, 'Breakfast'),
        (LUNCH, 'Lunch'),
        (MEAL, 'Meal'),
        (SNACK, 'Snack'),
        (DINNER, 'Dinner'),
    )