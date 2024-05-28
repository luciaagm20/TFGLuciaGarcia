from django.db import models
from backend.models.DayOfWeek import DayOfWeek
from backend.models.Food import Food
from backend.models.Meal import Meal
from backend.models.WeeklyMenu import WeeklyMenu


class FoodIntake(models.Model):
    weeklyMenu = models.ForeignKey(WeeklyMenu, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    calories = models.IntegerField()
    day_of_week = models.CharField(max_length=10, choices=DayOfWeek.CHOICES)
    meal = models.CharField(max_length=10, choices=Meal.CHOICES)
    

    