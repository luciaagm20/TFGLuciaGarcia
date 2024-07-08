
from django.db import models

from backend.models.client import Client

class WeeklyMenu(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
