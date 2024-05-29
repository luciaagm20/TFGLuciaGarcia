from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Configura el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

app = Celery('healthyMenu')

# Usa una cadena aquí para evitar que el worker Celery cargue la configuración de Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Descubre tareas automáticamente en cada archivo tasks.py de las aplicaciones instaladas
app.autodiscover_tasks()