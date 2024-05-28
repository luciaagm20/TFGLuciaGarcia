from django.db import models


class Allergies(models.Model):
    CHOICES = (
        (1, 'Celiac disease'),
        (2, 'Lactose intolerant'),
        (3, 'Seafood'),
        (4, 'Egg allergy'),
        (5, 'None')
    )

    