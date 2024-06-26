# HealthyMenu

Este proyecto es una aplicación web desarrollada con Django y React. Fue iniciada con [Create React App](https://github.com/facebook/create-react-app).

## Descripción del Proyecto


## Tecnologías Utilizadas

- Django
- React
- SQLite3
- Otros (bibliotecas, herramientas, etc.)
- Node.js
- npm

## Requisitos Previos e instalación

Asegúrate de tener instalados los siguientes programas:

### `Python 3.9+`
    Para verificar la versión de Python que tienes instalada, ejecuta:
        ```python --version 
    Para descargar Python sigue estos pasos: 
    - En Windows:
        1. Descarga el instalador desde [python.org](https://www.python.org/)
        2. Ejecuta el instalador y asegúrate de marcar la opción "Add Python to PATH".
    - En macOS o Linux:
        1. Usa pyenv para gestionar versiones de Python:
            curl https://pyenv.run | bash
        2. Instala Python 3.9.10 o 3.9+:
            pyenv install 3.9.10
        3. Configura la versión globalmente:
            pyenv global 3.9.10


- Django 4.2+
    Para verificar la versión de Django que tienes instalada, ejecuta:
  ```bash
    django-admin --version
    Para descargar una versión específica de Django: pip install Django==4.2.8


- npm 10.2+
    Para verificar la versión de npm que tienes instalada, ejecuta:
    ```bash
        npm --version
    Para descargar una versión específica de npm:
    Normalmente npm viene empaquetado con la versión de Node.js correspondiente cuando esta se descarga. Por lo tanto, solo es necesaria la descarga de Node.js.

- nvm
    Para verificar la versión de npm que tienes instalada, ejecuta:
    ```bash
        nvm version
    Para descargar nvm:
    - En Windows:
        1. Visita el repositorio de GitHub de [nvm-windows] (https://github.com/coreybutler/nvm-windows/releases) y descarga el instalador más reciente (archivo .zip o .exe).
        2. Sigue las instrucciones del instalador para completar la instalación. Asegúrate de seleccionar la opción para "Instalar Node.js" durante el proceso de instalación.
    - En macOS o Linux:
        1. Instalar nvm con el siguiente comando:
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        2. Es posible que necesites cerrar y abrir nuevamente la terminal para que puedan producirse los cambios.


- Node.js 21.4+
    Para verificar la versión de Node.js que tienes instalada, ejecuta:
    ```bash
        node --version
    Para descargar una versión específica de Node.js:
    - En Windows: 
        1. Descarga nvm como se ha especificado anteriormente.
        2. Instala la versión específica de Node.js ejecutando el siguiente comando: nvm install 21.4.0
        3. Usa la versión instalada en el proyecto: nvm use 21.4.0

        Otra forma de obtenerlo: 

        1. Visita el sitio oficial de Node.js [nodejs.org](https://nodejs.org/en)
        2. Buscar la versión v21.7.3 en la página de descargas o utiliza este enlace: [download nodejs.org](https://nodejs.org/en/download/package-manager)
        3. Ejecuta el instalador descargado y sigue las instrucciones del asistente de instalación para completar la instalación de Node.js versión 21.4.0 en tu sistema.

    - En macOS o Linux:
        1. Descarga nvm como se ha especificado anteriormente.
        2. Instala la versión específica de Node.js ejecutando el siguiente comando: nvm install 21.4.0
        3. Usa la versión instalada en el proyecto: nvm use 21.4.0

        Otra forma de obtenerlo:

        1. Visita el sitio oficial de Node.js [nodejs.org](https://nodejs.org/en)
        2. Buscar la versión v21.7.3 en la página de descargas o utiliza este enlace: [download nodejs.org](https://nodejs.org/en/download/package-manager)
        3. Ejecuta el instalador descargado y sigue las instrucciones del asistente de instalación para completar la instalación de Node.js versión 21.4.0 en tu sistema.



- SQLite3


### Backend (Django)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
