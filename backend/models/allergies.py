from django.db import models

class Allergies(models.Model):
    CeliacDisease = 'Celiac disease'
    LactoseIntolerant = 'Lactose intolerant'
    Seafood = 'Seafood'
    EggAllergy = 'Egg allergy'
    NONE = 'None'
    
    CHOICES = (
        (CeliacDisease, 'Celiac disease'),
        (LactoseIntolerant, 'Lactose intolerant'),
        (Seafood, 'Seafood'),
        (EggAllergy, 'Egg allergy')
    )
    NONE = 'None'
    allergy_type = models.CharField(primary_key=True, max_length=50, choices=((NONE, 'None'),) + CHOICES, default=NONE)


    def __str__(self):
        return self.allergy_type

