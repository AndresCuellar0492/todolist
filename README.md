# To-Do List App

## Descripción

La **To-Do List App** es una aplicación móvil construida con Ionic y Angular, diseñada para gestionar tareas de manera eficiente. Permite a los usuarios crear, editar, eliminar y categorizar tareas.

## Características

- **Gestión de Tareas**: Crear, editar y eliminar tareas.
- **Categorías**: Asignar y gestionar categorías para organizar las tareas.
- **Verificación de Última Tarea**: Al eliminar una tarea, se verifica si era la última en su categoría, proporcionando un booleano para acciones específicas.
- **Internacionalización**: Soporte para múltiples idiomas utilizando ngx-translate.

## Estructura del Proyecto

- `src/app/core`: Contiene servicios generales y utilidades.
- `src/app/data`: Implementaciones específicas de repositorios.
- `src/app/domain`: Entidades y repositorios abstractos.
- `src/app/presentation`: Lógica de UI y la interacción del usuario.
- `src/assets/i18n`: Archivos de traducción para soporte multilingüe.

## Instalación

### Clona el repositorio:

git clone https://github.com/yourusername/todolist-app.git

## Instala las dependencias:

npm install

## Configura Firebase (opcional):

Asegúrate de configurar Firebase Remote Config y agregar las credenciales en src/environments/environment.ts.

## Uso del Makefile

El Makefile incluido en el proyecto permite simplificar el proceso de construcción y despliegue en dispositivos Android e iOS.

# Comandos Disponibles:

- **Limpieza Total:**

- make clean-all
  Este comando elimina las plataformas, módulos y otros archivos generados, y luego reinstala las dependencias.

- **Construcción y Ejecución en Android:**

- make build-android
  Este comando verifica si la plataforma Android está instalada, la añade si es necesario, y luego construye y ejecuta la aplicación en un dispositivo Android conectado.

- **Construcción y Ejecución en iOS:**

- make build-ios
  Este comando realiza una verificación similar para iOS y luego construye la aplicación.

- **Generar APK(Android)**
  Para generar un archivo .apk listo para producción:

- ionic cordova build android --prod --release
  Esto generará un archivo APK en platforms/android/app/build/outputs/apk/release/.

- **Generar y Exportar .ipa(iOs)**
  Para exportar la app en formato .ipa para distribución:

# Archiva la App:

- Abre el proyecto en Xcode (platforms/ios/YourAppName.xcworkspace).
- Selecciona Product > Archive.

# Distribuye la App:

- En el Organizer de Xcode, selecciona el archivo y elige "Distribute App".
- Selecciona "Ad Hoc" o "App Store" según corresponda y sigue las instrucciones para exportar el archivo .ipa.

**Licencia**
Este proyecto está bajo la MIT License.
