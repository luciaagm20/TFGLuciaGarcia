from django.db import models


class Activity(models.Model):
    CHOICES = (
        (1, 'Sedentary'),
        (2, 'Light activity'),
        (3, 'Moderate activity'),
        (4, 'Daily exercise'),
        (5, 'Intense exercise'),
    )