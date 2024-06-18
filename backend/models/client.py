from django.db import models


from backend.models.Meal import Meal
from backend.models.Allergies import Allergies
from backend.models.Goal import Goal
from backend.models.Gender import Gender
from backend.models.Activity import Activity
from django.contrib.auth.models import AbstractUser, Group, Permission


class Client(AbstractUser):
    meals = models.ManyToManyField(Meal, blank=True)
    weight = models.IntegerField()
    age = models.IntegerField()
    height = models.IntegerField()
    gender = models.CharField(max_length=20,choices=Gender.CHOICES, default="Female")
    activity = models.CharField(max_length=20,choices=Activity.CHOICES, default="Sedentary")
    goal = models.CharField(max_length=20, choices=Goal.CHOICES, default="Maintenance")
    allergies = models.ManyToManyField(Allergies, blank=True)
    # text = models.TextField(blank=False)


    groups = models.ManyToManyField(
        Group,
        related_name='backend_users_groups',  
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='backend_user_group',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='backend_users_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='backend_user_permission',
    )




