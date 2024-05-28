from django.db import models


class Goal(models.Model):
    Maintenance = 'Maintenance'
    MuscleGain = 'Muscle gain'
    FatLoss = 'Fat loss'
    
    CHOICES = (
        (Maintenance, 'Maintenance'),
        (MuscleGain, 'Muscle gain'),
        (FatLoss, 'Fat loss')
    )