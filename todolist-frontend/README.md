# Atom To-Do List Frontend

## Descripción

Este proyecto es una aplicación frontend desarrollada en **Angular 17**, organizada utilizando principios de **Clean Architecture** y haciendo uso de **Componentes Standalone** para promover la modularidad, mantenibilidad y reutilización del código. La aplicación gestiona tareas mediante una arquitectura bien definida que utiliza **gateways como consumidores de API REST**.

## Organización del Proyecto

El proyecto sigue una estructura modular y separa las responsabilidades en capas bien definidas:

### 1. **Capa de Presentación (Presentation Layer)**

Esta capa incluye los componentes y páginas que interactúan directamente con el usuario. Está diseñada para ser reutilizable y accesible.

- **Componentes:** 
  - **ErrorMessageComponent:** Muestra mensajes de error personalizados.
  - **CustomNotificationComponent:** Notificaciones adaptables para el usuario.
  - **TaskModalComponent:** Modal para la creación y edición de tareas.
  - **LoadingComponent:** Indicador reutilizable para procesos en ejecución.

- **Páginas:** 
  - **AuthPage:** Página dedicada a la autenticación.
  - **TaskPage:** Página principal para gestionar tareas.

### 2. **Capa de Aplicación (Application Layer)**

Define la lógica principal de la aplicación mediante casos de uso. Esta capa actúa como intermediaria entre la capa de presentación y el dominio.

- **Guards:**
  - `AuthGuard:` Protege rutas restringidas a usuarios autenticados.

- **Casos de Uso:**
  - **Auth:**
    - `CheckUserStatusUseCase`: Valida el estado del usuario.
    - `UserAuthUseCase`: Maneja procesos de autenticación.
  - **Tasks:**
    - `TasksUseCase`: Implementa operaciones relacionadas con tareas.

### 3. **Capa de Dominio (Domain Layer)**

Incluye las entidades, interfaces y reglas de negocio que definen la aplicación.

- **Entidades:**
  - **User:** Representa a un usuario con sus propiedades esenciales.
  - **Task:** Describe las tareas con sus características principales.

- **Interfaces:**
  - **AuthGateway:** Define las operaciones necesarias para autenticación.
  - **TaskGateway:** Establece las operaciones para la gestión de tareas.

### 4. **Capa de Infraestructura (Infrastructure Layer)**

Implementa la interacción con recursos externos como APIs REST. Utiliza **gateways** para encapsular las operaciones necesarias, manteniendo desacopladas las demás capas.

- **Gateways como Consumidores de API REST:**
  - **AuthApiService:** Maneja las peticiones REST relacionadas con la autenticación de usuarios, como el inicio de sesión y registro.
  - **TaskApiService:** Administra las operaciones de tareas mediante peticiones REST, como la creación, edición y eliminación.

- **Configuración:**
  - `auth-endpoints.config.ts`: Contiene los endpoints de la API para autenticación.
  - `task-endpoints.config.ts`: Define los endpoints para la gestión de tareas.

- **Utilidades:**
  - `error.service.impl.ts`: Centraliza el manejo de errores.
  - `local-storage.util.ts`: Proporciona funciones para interactuar con el almacenamiento local.

### 5. **Capa Compartida (Shared Layer)**

La capa compartida contiene recursos reutilizables como servicios, pipes y componentes auxiliares.

- **Componentes Compartidos:**
  - **LoadingComponent:** Indicador de carga reutilizable.
  - **NotificationComponent:** Gestión de notificaciones visuales.

- **Servicios Compartidos:**
  - `NotificationService`: Notificaciones centralizadas.
  - `LoadingService`: Control de indicadores de carga.
  - `ModalService`: Manejo dinámico de modales.

- **Pipes:**
  - `FormatDatePipe`: Formatea fechas para su visualización.

- **Constantes:**
  - `AppConstants`: Configuraciones generales.
  - `UserErrorsConstants`: Mensajes de error comunes.

### 6. **Entornos**

El proyecto soporta múltiples configuraciones para entornos de desarrollo, pruebas y producción.

- **Archivos de Configuración:**
  - `environment.ts`: Configuración para desarrollo.
  - `environment.prod.ts`: Configuración para producción.
  - `environment.staging.ts`: Configuración para staging.

### 7. **Estilos**

Utiliza SCSS para la personalización y mantiene variables globales definidas en `_variables.scss` para facilitar la consistencia de diseño.

---

## Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/devharoldolopez/atom-todolist.git
cd todolist-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
```bash
ng serve
```

### 4. Compilar para producción
```bash
ng build --configuration production
```

---

## Buenas Prácticas Aplicadas

1. **Separation of Concerns:** Cada capa tiene responsabilidades específicas.
2. **Reutilización:** Servicios y componentes compartidos para evitar redundancia.
3. **Desacoplamiento:** Uso de interfaces y gateways para aislar las capas.
4. **Escalabilidad:** Arquitectura modular para soportar futuras expansiones.
5. **Manejo de errores:** Centralizado mediante servicios dedicados.
