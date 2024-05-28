from django.utils import timezone
from django import forms
from django.db import models

class User(models.Model):
    name = models.TextField()
    email = models.EmailField()
    password = models.TextField(max_length=10)
    insertion_date = models.DateField(default=timezone.now)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.name