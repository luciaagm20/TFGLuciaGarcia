from django.db import models

from backend.models.allergies import Allergies
from backend.models.goal import Goal
from backend.models.user import User
from backend.models.gender import Gender

class Client(User):
    weight = models.FloatField()
    age = models.IntegerField()
    height = models.IntegerField()
    gender = models.IntegerField(choices=Gender.CHOICES)
    goal = models.IntegerField(choices=Goal.CHOICES)
    allergies = models.IntegerField(choices=Allergies.CHOICES)
