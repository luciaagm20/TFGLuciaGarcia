from django.db import models

from backend.models.Allergies import Allergies
from backend.models.Goal import Goal
from backend.models.User import User
from backend.models.Gender import Gender

class Client(User):
    number_meals = models.TextField()
    weight = models.IntegerField()
    age = models.IntegerField()
    height = models.IntegerField()
    gender = models.CharField(max_length=10,choices=Gender.CHOICES)
    goal = models.IntegerField(choices=Goal.CHOICES)
    allergies = models.IntegerField(choices=Allergies.CHOICES)
