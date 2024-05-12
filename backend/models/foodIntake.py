from django.db import models
from backend.models.dayOfWeek import DayOfWeek
from backend.models.food import Food
from backend.models.meal import Meal
from backend.models.weeklyMenu import WeeklyMenu


class FoodIntake(models.Model):
    weeklyMenu = models.ForeignKey(WeeklyMenu, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    calories = models.IntegerField()
    day_of_week = models.CharField(max_length=10, choices=DayOfWeek.CHOICES)
    meal = models.CharField(max_length=10, choices=Meal.CHOICES)
    

    