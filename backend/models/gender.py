from django.db import models


class Gender(models.Model):
    FEMALE = 'Female'
    MALE = 'Male'
    
    CHOICES = (
        (FEMALE, 'Female'),
        (MALE, 'Male')
    )