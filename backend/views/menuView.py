from django.http import HttpResponse
from rest_framework.response import Response
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from backend.serializers.MenuSerializer import MenuSerializer
from backend.services.ClientService import ClientService
from backend.services.FoodIntakeService import FoodIntakeService
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
        serializer = MenuSerializer(menu, many=True)
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
            return Response({"detail": "id_cliente parameter is required"}, status=400)
        
        try:
            # Aquí asumes que tienes un método en tu repositorio para obtener un cliente por su ID
            cliente = ClientService.read(client_id)
            if cliente is None:
                return Response({"detail": "Client not found"}, status=404)
            
            menu = MenuService.create_weekly_menu(cliente)
            serializer = MenuSerializer(menu)
            return Response(serializer.data, status=201)
        except Exception as e:
            return Response({"detail": str(e)}, status=500)
    
    @action(detail=False, methods=['get'], url_path='download-weekly-menu')
    def download_weekly_menu(self, request):
        menu_id = request.query_params.get('menu_id')
        if not menu_id:
            return Response({"detail": "menu_id parameter is required"}, status=400)
        
        # Obtener los datos del menú usando el menu_id
        menu_data = MenuService.read(menu_id)
        if not menu_data:
            return Response({"detail": f"Menu with id {menu_id} not found"}, status=404)
        
        # Crear la respuesta HTTP con el contenido del PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="weekly_menu_{menu_id}.pdf"'
        
        # Crear el objeto PDF usando ReportLab
        p = canvas.Canvas(response, pagesize=letter)
        p.setFont("Helvetica", 12)
        
        # Agregar contenido dinámico del menú al PDF
        p.drawString(100, 750, "Weekly Menu")
        # Aquí puedes agregar más contenido según tu estructura de menú y los datos de menu_data
        # Obtener datos específicos del menú desde el frontend
        # start_date = menu_data.get('start_date', '')
        # end_date = menu_data.get('end_date', '')
            
        #     # Agregar detalles del período del menú
        # p.drawString(100, 730, f"Period: {start_date} - {end_date}")
            
        
        p.showPage()
        p.save()
        
        return response
