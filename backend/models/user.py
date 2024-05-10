from django.db import models

class User(models.Model):
    name = models.TextField()
    email = models.TextField()
    password = models.TextField(max_length=50)
    insertion_date = models.DateField()
    is_admin = models.BooleanField()