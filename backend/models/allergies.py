from django.db import models

class Allergies(models.Model):
    CeliacDisease = 'Celiac disease'
    LactoseIntolerant = 'Lactose intolerant'
    Seafood = 'Seafood'
    EggAllergy = 'Egg allergy'
    NONE = 'None'
    
    CHOICES = (
        (NONE, 'None'),
        (CeliacDisease, 'Celiac disease'),
        (LactoseIntolerant, 'Lactose intolerant'),
        (Seafood, 'Seafood'),
        (EggAllergy, 'Egg allergy')
    )
    allergy_type = models.CharField(max_length=50, choices=CHOICES, default=NONE)

    def __str__(self):
        return self.allergy_type

