from backend.repositories.FoodIntakeRepository import FoodIntakeRepository

class FoodIntakeService:

    def list():
        return FoodIntakeRepository.list()

    def read(menu):
        return FoodIntakeRepository.read(menu)

    def delete(menu):
        FoodIntakeRepository.delete(menu)
     