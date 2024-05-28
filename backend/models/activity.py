from django.db import models


class Activity(models.Model):
    Sedentary = 'Sedentary'
    LightActivity = 'Light activity'
    ModerateActivity = 'Moderate activity'
    DailyExercise = 'Daily exercise'
    IntenseExercise = 'Intense exercise'
   
    
    CHOICES = (
        (Sedentary, 'Sedentary'),
        (LightActivity, 'Light activity'),
        (ModerateActivity, 'Moderate activity'),
        (DailyExercise, 'Daily exercise'),
        (IntenseExercise, 'Intense exercise')
    )