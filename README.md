# HealthyMenu

Este proyecto es una aplicación web desarrollada con Django y React. 

## Descripción del Proyecto


## Tecnologías Utilizadas

- Python
- Django
- React
- SQLite3
- Node.js
- npm
- Otros (bibliotecas, herramientas, etc.)

## Requisitos Previos e instalación

Asegúrate de tener instalados los siguientes programas:

### `Python 3.9+`
- Para verificar la versión de Python que tienes instalada, ejecuta:
    `python --version` 
- Para descargar Python sigue estos pasos: 
    - En Windows:
        1. Descarga el instalador desde [python.org](https://www.python.org/)
        2. Ejecuta el instalador y asegúrate de marcar la opción "Add Python to PATH".
    - En macOS o Linux:
        1. Usa pyenv para gestionar versiones de Python:
            `curl https://pyenv.run | bash`
        2. Instala Python 3.9.10 o 3.9+:
            `pyenv install 3.9.10`
        3. Configura la versión globalmente:
            `pyenv global 3.9.10`

### `Django 4.2+`
- Para verificar la versión de Django que tienes instalada, ejecuta:
    `django-admin --version`
- Para descargar una versión específica de Django: `pip install Django==4.2.8`

### `npm 10.2+`
- Para verificar la versión de npm que tienes instalada, ejecuta:
    `npm --version`
- Para descargar una versión específica de npm:
    Normalmente npm viene empaquetado con la versión de Node.js correspondiente cuando esta se descarga. Por lo tanto, solo es necesaria la descarga de Node.js.

### `nvm`
- Para verificar la versión de npm que tienes instalada, ejecuta:
    `nvm version`
- Para descargar nvm:
    - En Windows:
        1. Visita el repositorio de GitHub de [nvm-windows] (https://github.com/coreybutler/nvm-windows/releases) y descarga el instalador más reciente (archivo .zip o .exe).
        2. Sigue las instrucciones del instalador para completar la instalación. Asegúrate de seleccionar la opción para "Instalar Node.js" durante el proceso de instalación.
        3. Es posible que necesites cerrar y abrir nuevamente la terminal para que puedan producirse los cambios.
    - En macOS o Linux:
        1. Instalar nvm con el siguiente comando:
            `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
        2. Es posible que necesites cerrar y abrir nuevamente la terminal para que puedan producirse los cambios.

### `Node.js 21.4+`
- Para verificar la versión de Node.js que tienes instalada, ejecuta:
    node --version
- Para descargar una versión específica de Node.js:
    - En Windows: 
        1. Descarga nvm como se ha especificado anteriormente.
        2. Instala la versión específica de Node.js ejecutando el siguiente comando: `nvm install 21.4.0`
        3. Usa la versión instalada en el proyecto: `nvm use 21.4.0`

        Otra forma de obtenerlo: 

        1. Visita el sitio oficial de Node.js [nodejs.org](https://nodejs.org/en)
        2. Buscar la versión v21.7.3 en la página de descargas o utiliza este enlace: [download nodejs.org](https://nodejs.org/en/download/package-manager)
        3. Ejecuta el instalador descargado y sigue las instrucciones del asistente de instalación para completar la instalación de Node.js versión 21.4.0 en tu sistema.

    - En macOS o Linux:
        1. Descarga nvm como se ha especificado anteriormente.
        2. Instala la versión específica de Node.js ejecutando el siguiente comando: `nvm install 21.4.0`
        3. Usa la versión instalada en el proyecto: `nvm use 21.4.0`

        Otra forma de obtenerlo:

        1. Visita el sitio oficial de Node.js [nodejs.org](https://nodejs.org/en)
        2. Buscar la versión v21.7.3 en la página de descargas o utiliza este enlace: [download nodejs.org](https://nodejs.org/en/download/package-manager)
        3. Ejecuta el instalador descargado y sigue las instrucciones del asistente de instalación para completar la instalación de Node.js versión 21.4.0 en tu sistema.


### `SQLite3`

## Modulos y bibliotecas

### Backend
Para poder ejecutar correctamente el proyecto de Django, se deben instalar algunas dependencias escribiendo los siguientes comandos:
    `pip install djangorestframework`
    `pip install djangorestframework-simplejwt`
    `pip install django-cors-headers`
    `pip install reportlab`

### Frontend
Para poder ejecutar correctamente el proyecto de React, se deben instalar algunas dependencias y bibliotecas que han sido utilizadas para desarrollar el proyecto. Estas dependencias se ejecutan automáticamente siguiendo los siguientes pasos:
1. Abre una terminal en Visual Studio Code y posicionate en la carpeta frontend con el comando: `cd ./frontend`
2. Instala las dependencias con el siguiente comando: `npm install para intalar las dependencias`

### Base de datos
Para visualizar la base de datos del proyecto, puede instalarse una extension de VSC con el ID `alexcvzz.vscode-sqlite`.
Una vez instalada, en la barra de búsqueda se debe escribir: `>SQLite: Open Database` y seleccionar la base de datos 'sqlite3.db'. 

## Ejecución del código

1. Descarga el .zip o clona el repositorio:
   ```bash
   git clone https://github.com/luciaagm20/TFGLuciaGarcia.git
   cd TFGLuciaGarcia

2. Abre la carpeta en Visual Studio Code.
3. Abre la terminal y posicionate en 
4. Para ejecutar la aplicación entera hay que seguir los siguientes pasos:
    - Ejecuta el backend con el comando: `python manage.py runserver`
    - Añade otra terminal y posicionate en la carpeta de frontend con el comando: `cd ./frontend`
    - Ejecuta el frontend con el comando: `npm runserver`

5. Para visualizar el backend, abre [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
6. Para visualizar el frontend, abre [http://localhost:3000](http://localhost:3000)





