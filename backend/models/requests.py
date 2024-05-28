from backend.models.Client import Client
from django.db import models


class Requests(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    text = models.TextField()
