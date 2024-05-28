from django.db import models

from backend.models.Allergies import Allergies
from backend.models.Goal import Goal
from backend.models.User import User
from backend.models.Gender import Gender
from backend.models.Activity import Activity

class Client(User):
    number_meals = models.TextField()
    weight = models.IntegerField()
    age = models.IntegerField()
    height = models.IntegerField()
    gender = models.CharField(max_length=20,choices=Gender.CHOICES, default="Female")
    activity = models.CharField(max_length=20,choices=Activity.CHOICES, default="Sedentary")
    goal = models.CharField(max_length=20, choices=Goal.CHOICES, default="Maintenance")
    allergies = models.CharField(max_length=20, choices=Allergies.CHOICES, default=Allergies.NONE)



