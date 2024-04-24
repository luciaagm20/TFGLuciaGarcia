from django.db import models

# Create your models here.

class Objective(models.Model):
    CHOICES = (
        (1, 'Maintenance'),
        (2, 'Muscle gain'),
        (3, 'Fat loss'),
    )

class Allergies(models.Model):
    CHOICES = (
        (1, 'Celiac disease'),
        (2, 'Lactose intolerant'),
        (3, 'None')
    )

class DayOfWeek(models.Model):
    MONDAY = 'Monday'
    TUESDAY = 'Tuesday'
    WEDNESDAY = 'Wednesday'
    THURSDAY = 'Thursday'
    FRIDAY = 'Friday'
    SATURDAY = 'Saturday'
    SUNDAY = 'Sunday'

    CHOICES = (
        (MONDAY, 'Monday'),
        (TUESDAY, 'Tuesday'),
        (WEDNESDAY, 'Wednesday'),
        (THURSDAY, 'Thursday'),
        (FRIDAY, 'Friday'),
        (SATURDAY, 'Saturday'),
        (SUNDAY, 'Sunday'),
    )


class Meal(models.Model):
    BREAKFAST = 'Breakfast'
    LUNCH = 'Lunch'
    MEAL = 'Meal'
    SNACK = 'Snack'
    DINNER = 'Dinner'

    CHOICES = (
        (BREAKFAST, 'Breakfast'),
        (LUNCH, 'Lunch'),
        (MEAL, 'Meal'),
        (SNACK, 'Snack'),
        (DINNER, 'Dinner'),
    )


class Food(models.Model):
    group_code = models.IntegerField()
    subgroup_code = models.IntegerField()
    group_name = models.TextField()
    subgroup_name = models.TextField()
    food_code = models.IntegerField()
    food_name = models.TextField()
    water = models.SmallIntegerField()
    protein = models.SmallIntegerField()
    carbohydrates = models.SmallIntegerField()
    fats = models.SmallIntegerField()
    sugars = models.SmallIntegerField()
    glucose = models.SmallIntegerField()
    lactose = models.SmallIntegerField()

class User(models.Model):
    name = models.TextField()
    email = models.TextField()
    password = models.TextField(max_length=50)
    insertion_date = models.DateField()
    is_admin = models.BooleanField()

class Client(User):
    weight = models.FloatField()
    age = models.IntegerField()
    height = models.IntegerField()
    objective = models.IntegerField(choices=Objective.CHOICES)
    allergies = models.IntegerField(choices=Allergies.CHOICES)

class Requests(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    text = models.TextField()

class WeeklyMenu(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

class FoodIntake(models.Model):
    weeklyMenu = models.ForeignKey(WeeklyMenu, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=10, choices=DayOfWeek.CHOICES)
    meal = models.CharField(max_length=10, choices=Meal.CHOICES)

    class Meta:
        unique_together = ('weeklyMenu', 'food')  # Para evitar entradas duplicadas