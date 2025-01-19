
# Instrucciones de Instalación

## Requisitos previos
- **Node.js** (versión 16 o superior)
- **npm** (Node Package Manager)
- **Git**
- **Expo CLI**
- Un IDE compatible (por ejemplo, Visual Studio Code)
- **Expo Go** (aplicación móvil para pruebas, disponible en App Store/Google Play)


## Descargar el proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/your-repo-link.git
   ```

2. Accede al directorio del proyecto:
   ```bash
   cd project-folder
   ```



## Instalación de dependencias
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```



## Configuración de variables de entorno
4. Configura el archivo `.env`:
   - Copia el archivo proporcionado `env.example` y renómbralo como `.env`.
   - Completa los valores necesarios, como claves API de Firebase o URLs del servidor.



## Ejecutar el proyecto
5. Inicia el servidor de desarrollo de Expo:
   ```bash
   npm start
   ```

6. Usa Expo Go en tu dispositivo móvil:
   - Escanea el código QR que aparece en tu terminal o navegador para ejecutar la aplicación en tu teléfono.



## Conexión con el servidor local
7. Asegúrate de que tu servidor local esté ejecutándose en:
   ```
   http://localhost:8081
   ```
   - Si es necesario, actualiza la configuración de la aplicación para apuntar a esta URL.



## Pruebas del proyecto (Opcional)
8. Ejecuta las pruebas:
   ```bash
   npm test
   ```



## Notas adicionales
- Asegúrate de que las versiones de **Node.js** y **npm** cumplan con los requisitos previos.
- Si encuentras problemas:
  - Consulta el archivo `README`.
  - Contacta al equipo del proyecto.
  - Revisa la [Documentación de Expo](https://docs.expo.dev/).

