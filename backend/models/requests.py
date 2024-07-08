from django.db import models
from backend.models.client import Client


class Requests(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='text')
    text = models.TextField()


    def __str__(self):
        return self.text
