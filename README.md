# Atom To-Do List Application

## Descripción

Atom To-Do List es una aplicación diseñada para la gestión de tareas, que utiliza **Angular 17** para el frontend y **Firebase Functions** para el backend. Este proyecto aplica principios de arquitectura limpia (Clean Architecture) y está organizado para ser modular, mantenible y escalable.

## Estructura del Proyecto

El repositorio contiene dos subproyectos principales:

### 1. Frontend: `todolist-frontend`

Este subproyecto es una aplicación desarrollada con **Angular 17** que proporciona la interfaz de usuario para la gestión de tareas.

#### Organización general del código (ver mas detalle entrando al subproyecto)
- **`src/app`**: Contiene los módulos principales de la aplicación:
  - **`auth`**: Módulo de autenticación, incluye casos de uso, entidades, interfaces, y componentes para la gestión de usuarios.
  - **`tasks`**: Módulo para la gestión de tareas, organizado en casos de uso, entidades, interfaces, y componentes.
  - **`shared`**: Módulo compartido que contiene componentes reutilizables, servicios, directivas, y utilidades.
  - **`constants`**: Define constantes usadas globalmente en la aplicación, como mensajes de error y configuraciones generales.

- **`src/environments`**: Configuración para los diferentes entornos (desarrollo, producción y staging).

- **`styles`**: Archivos de estilos globales en SCSS, incluyendo variables reutilizables.

#### Versión de softwares para el desarrollo
- Node: v22.11.0
- NPM: 10.9.0
- Angular CLI: 17.3.11

#### Dependencias principales
- Angular CLI.
- Material Design.

#### Comandos útiles
- **Instalación de dependencias**:
  ```bash
  npm install
  ```
- **Ejecución en modo desarrollo**:
  ```bash
  ng serve
  ```
- **Compilación para producción**:
  ```bash
  ng build --configuration production
  ```

#### Deploy de la aplicación
La aplicación está desplegada en Firebase Hosting para su visualización. Enviar un correo a devharoldolopez@gmail.com para más información.

---

### 2. Backend: `todolist-backend`

Este subproyecto es un backend basado en **Firebase Functions**, diseñado para manejar la lógica del negocio y proporcionar una API segura para el frontend.

#### Organización general del código (ver mas detalle entrando al subproyecto)
- **`functions/lib`**: Contiene la lógica compilada en JavaScript. La carpeta principal del desarrollo está en **TypeScript**.
- **`application`**: Implementa los casos de uso de la aplicación, organizados en módulos:
  - **`auth`**: Manejo de autenticación y autorización.
  - **`tasks`**: Lógica relacionada con la gestión de tareas.
  - **`users`**: Gestión de usuarios y perfiles.

- **`config`**: Configuraciones y definición de dependencias para inyección (Dependency Injection).

- **`infrastructure`**: Contiene la lógica de interacción con Firestore, incluyendo repositorios, servicios de configuración y utilidades.

- **`constants`**: Define constantes para manejo de errores, estados HTTP, y configuraciones globales.

- **`index.js`**: Punto de entrada principal para las funciones de Firebase.

#### Dependencias principales
- Firebase Admin SDK.
- Express (para la creación de rutas y middleware).
- Cors (para el manejo de solicitudes entre dominios).

#### Comandos útiles
- **Instalación de dependencias**:
  ```bash
  npm install
  ```
- **Despliegue de funciones**:
  ```bash
  firebase deploy --only functions
  ```
- **Ejecución en modo local**:
  ```bash
  firebase emulators:start
  ```

---

## Configuración del Proyecto

### Variables de Entorno
El proyecto utiliza variables de entorno para configurar Firebase y las rutas de la API. Estas deben definirse en los archivos correspondientes en las carpetas de configuración:
- `src/environments` (Frontend).
- `.env` o variables directas en Firebase (Backend).

### Instalación Inicial
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/devharoldolopez/atom-todolist.git
   cd atom-todolist
   ```
2. **Instalar dependencias** en ambos subproyectos:
   ```bash
   cd todolist-frontend
   npm install
   cd ../todolist-backend
   npm install
   ```
3. **Configurar Firebase**:
   - Crear un proyecto en Firebase.
   - Actualizar los archivos `firebase.json` y `functions/.runtimeconfig.json` con las configuraciones del proyecto.

4. **Ejecutar el frontend y backend**:
   - Iniciar el servidor de desarrollo de Angular: `ng serve`.
   - Construirfunciones e iniciar el emulador de Firebase Functions en desarrollo: `npm run serve`.
