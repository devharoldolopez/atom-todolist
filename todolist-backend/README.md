# Atom To-Do List Backend

## Descripción del Proyecto
Este proyecto implementa un backend para un sistema de tareas utilizando Firebase Functions y TypeScript, siguiendo los principios de la Arquitectura Limpia (Clean Architecture). La arquitectura garantiza un sistema modular, mantenible y escalable, separando responsabilidades en diferentes capas lógicas.

## Tecnologías Utilizadas
- **Firebase Functions**: Para ejecutar funciones serverless.
- **TypeScript**: Tipado estático para mayor seguridad y legibilidad del código.
- **Clean Architecture**: Implementación basada en dominios, casos de uso y adaptadores.
- **Firestore**: Base de datos NoSQL para persistencia de datos.
- **Express**: Framework para definir controladores y rutas HTTP.

## Estructura del Proyecto
El proyecto está dividido en las siguientes capas:

### 1. **Domain**
Contiene las reglas de negocio y los modelos principales del sistema.
- **Entities**: Modelos de dominio como `Tasks` y `Users`.
- **Errors**: Manejo de errores de negocio.
- **Shared**: Interfaces compartidas para respuestas.

### 2. **Application**
Define los casos de uso (use cases) del sistema, que encapsulan la lógica de aplicación.
- **Interfaces**: Contratos que definen la interacción entre capas.
- **UseCases**: Implementaciones de los casos de uso como `AuthUseCase` o `TasksUseCase`.

### 3. **Infrastructure**
Proporciona implementaciones específicas para los servicios y adaptadores.
- **Config**: Configuración de Firebase.
- **Database**: Repositorios que interactúan con Firestore.
- **Express**:
  - **Controllers**: Controladores HTTP.
  - **Middlewares**: Middleware como validación y manejo de errores.
  - **Routes**: Definición de rutas HTTP.
- **Shared**: Utilidades como `ApiResponse`.
- **Utils**: Herramientas como `FirestoreUtils`.

### 4. **Config**
Define la inyección de dependencias para cada módulo, asegurando un bajo acoplamiento entre componentes.

### 5. **Constants**
- **Errors**: Definición de mensajes de error comunes.
- **HTTP**: Códigos de estado y respuestas.
- **General**: Constantes generales del sistema.

## Principales Módulos

### **Auth**
- **Dominio**: `auth.interface.ts`, define las entidades relacionadas con la autenticación.
- **Casos de Uso**: Lógica de autenticación, como inicio de sesión y verificación de usuarios.
- **Infraestructura**: `auth.controller.ts` maneja las solicitudes HTTP.

### **Tasks**
- **Dominio**: Modelo de tareas con validaciones y reglas específicas.
- **Casos de Uso**: Lógica para crear, listar, y eliminar tareas.
- **Infraestructura**: `tasks.controller.ts` define las operaciones CRUD de tareas.

### **Users**
- **Dominio**: Modelo de usuario que incluye información básica.
- **Casos de Uso**: Lógica de registro y actualización de usuarios.
- **Infraestructura**: `user.controller.ts` maneja las rutas relacionadas con usuarios.

## Buenas Prácticas Implementadas
1. **Separación de Capas**: Cada capa tiene una responsabilidad bien definida.
2. **Inyección de Dependencias**: Uso de patrones como el contenedor de inyección para facilitar pruebas unitarias.
3. **TypeScript**: Uso extensivo de tipos para evitar errores en tiempo de ejecución.
4. **Controladores Livianos**: La lógica de negocio está en los casos de uso, no en los controladores.
5. **Validación**: Middleware dedicado para manejar validaciones de entrada.
6. **Manejo de Errores**: Centralización del manejo de errores mediante middleware.
7. **Testing**: Diseño orientado a pruebas con interfaces desacopladas.

## Instalación y Configuración
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/devharoldolopez/atom-todolist.git
   cd todolist-backend
   ```

2. Instalar dependencias:
   ```bash
   cd functions
   npm install
   ```

3. Configurar Firebase:
   - Modificar `firebase.config.ts` con tus credenciales.

4. Desplegar funciones:
   ```bash
   firebase deploy --only functions
   ```

## Ejecución Local
Para ejecutar el backend localmente:
```bash
firebase emulators:start
```
