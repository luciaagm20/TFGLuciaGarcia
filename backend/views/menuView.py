from django.http import HttpResponse
from rest_framework.response import Response
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from backend.serializers.MenuSerializer import MenuSerializer
from backend.services.ClientService import ClientService
from backend.services.FoodIntakeService import FoodIntakeService
from backend.services.FoodService import FoodService
from backend.services.MenuService import MenuService
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class MenuViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    def list(self, request):
        menu = MenuService.listMenu()
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        menu = MenuService.read(pk)
        serializer = MenuSerializer(menu)
        return Response(serializer.data)
    
    # GET /api/menu/filter-by-client?id_cliente=<client_id>
    @action(detail=False, methods=['get'], url_path='filter-by-client')
    def filter_by_client(self, request):
        client_id = request.query_params.get('id_cliente')
        if client_id is None:
            return Response({"detail": "id_cliente parameter is required"}, status=400)
        menu = MenuService.list_by_client(client_id)
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    # POST /api/menu/create-weekly-menu/
    @action(detail=False, methods=['post'], url_path='create-weekly-menu')
    def create_weekly_menu(self, request):
        client_id = request.data.get('id_client')
        if client_id is None:
            return Response({"detail": "id_client parameter is required"}, status=400)
        
        try:
            cliente = ClientService.read(client_id)
            if cliente is None:
                return Response({"detail": "Client not found"}, status=404)
            
            menu = MenuService.create_weekly_menu(cliente)
            serializer = MenuSerializer(menu)
            return Response(serializer.data, status=201)
        except Exception as e:
            return Response({"detail": str(e)}, status=500)
    
    # http://localhost:8000/api/menu/download-weekly-menu/?menu_id=id
    @action(detail=False, methods=['get'], url_path='download-weekly-menu')
    def download_weekly_menu(self, request):
        menu_id = request.query_params.get('menu_id')
        if not menu_id:
            return Response({"detail": "menu_id parameter is required"}, status=400)
        
        menu_data = MenuService.read(menu_id)
        food_intake = FoodIntakeService.read_values(menu_id)
        if not menu_data:
            return Response({"detail": f"Menu with id {menu_id} not found"}, status=404)
        
        start_date = menu_data.start_date
        end_date = menu_data.end_date
        start_date_str = start_date.strftime('%Y-%m-%d')
        end_date_str = end_date.strftime('%Y-%m-%d')

        food_ids = [item.food_id for item in food_intake if item.food_id is not None]

        food_names = []
        for food_id in food_ids:
            food_names_response = FoodService.read_array_of_ids(food_id)
            if food_names_response:
                food_names.append({'id': food_id, 'name': food_names_response.food_name})

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="weekly_menu_{menu_id}.pdf"'
        
        p = canvas.Canvas(response, pagesize=letter)
        p.setFont("Courier", 12)
        
        r = 157 / 255.0
        g = 241 / 255.0
        b = 142 / 255.0

        p.setFillColorRGB(r, g, b)
        
        p.rect(0, 0, letter[0], letter[1], fill=1)

        title = "Weekly Menu"
        title_width = p.stringWidth(title, "Courier-Bold", 16) 
        p.setFont("Courier-Bold", 16)
        p.setFillColorRGB(0, 0, 0)  
        p.drawString((letter[0] - title_width) / 2, 750, title)

        p.setFont("Courier-Bold", 12)
        start_date_width = p.stringWidth(f"Start Date: {start_date_str}", "Courier-Bold", 12)
        p.drawString((letter[0] - start_date_width) / 2, 730, f"Start Date: {start_date_str}")
        end_date_width = p.stringWidth(f"End Date: {end_date_str}", "Courier-Bold", 12)
        p.drawString((letter[0] - end_date_width) / 2, 710, f"End Date: {end_date_str}")

        days_of_week = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        food_data_by_day = {day: [] for day in days_of_week}
        
        for item in food_intake:
            day = item.day_of_week.upper() 
            if day in days_of_week:
                food_name = next((food['name'] for food in food_names if food['id'] == item.food_id), 'Unknown')
                food_data_by_day[day].append({
                    'meal': item.meal,
                    'food': food_name,
                    'calories': item.calories
                })
    
        y_position = 690
        for day in days_of_week:
            p.drawString(40, y_position, day)
            y_position -= 10
            for meal in food_data_by_day[day]:
                p.drawString(120, y_position, f"{meal['meal']} - {meal['food']} ({meal['calories']} kcal)")
                y_position -= 16
            y_position -= 7  
                
        
        p.showPage()
        p.save()
        
        return response
