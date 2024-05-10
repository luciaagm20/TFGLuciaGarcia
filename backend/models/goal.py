from django.db import models


class Goal(models.Model):
    CHOICES = (
        (1, 'Maintenance'),
        (2, 'Muscle gain'),
        (3, 'Fat loss'),
    )