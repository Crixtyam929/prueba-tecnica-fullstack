# Prueba Técnica Fullstack – Java + Angular

<br>

## 📖 Descripción General

Aplicación Fullstack desarrollada como prueba técnica, compuesta por un backend en **Java 17 con Spring Boot** y un frontend en **Angular**.  

El sistema consume una API externa (JSONPlaceholder), expone servicios REST propios y registra en base de datos cada petición realizada (logs), incluyendo manejo y simulación controlada de errores conforme a los requerimientos del documento de la prueba técnica.

<br>

---

# 🚀 Uso del Aplicativo

El sistema cuenta con tres módulos principales:

<br>

## 🏠 1. Home (Usuarios y Publicaciones)

- Listar usuarios desde la API externa.
- Visualizar publicaciones por usuario.
- Visualizar todas las publicaciones.
- Simular error controlado desde backend.
- Mostrar mensajes diferenciados para:
  - Error de conexión (backend apagado).
  - Error HTTP 500 (simulación controlada).

<br>

## 📁 2. Álbumes por Usuario

- Seleccionar un usuario.
- Consultar sus álbumes.
- Mostrar mensaje si no existen registros.

<br>

## 🗂 3. Gestión de Logs

- Listar todas las peticiones registradas.
- Crear nuevo log.
- Editar log existente.
- Eliminar log (con confirmación).
- Validaciones en frontend:
  - Métodos HTTP permitidos: GET, POST, PUT, DELETE.
  - Endpoint obligatorio iniciado en `/`.
  - Código HTTP de 3 dígitos (100–599).

<br>

---

# ⚙️ Instalación y Ejecución

<br>

## 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/prueba-tecnica-fullstack.git
```

<br>

## 🔹 2. Ejecutar Backend

Ubicarse en la carpeta `backend` del proyecto:
```bash
cd backend
```

Compilar y ejecutar la aplicación con Maven:
```bash
mvn spring-boot:run
```
El backend se iniciará por defecto en:
```bash
[mvn spring-boot:run](http://localhost:8080)
```
📌 Endpoints principales
- GET /api/users
- GET /api/posts
- GET /api/posts/user/{userId}
- GET /api/albums/{userId}
- GET /api/logs
- POST /api/logs
- PUT /api/logs/{id}
- DELETE /api/logs/{id}

<br>

## 🔹 3. Ejecutar Frontend

Ubicarse en la carpeta frontend:
```bash
cd frontend
```
Instalar dependencias:
```bash
npm install
```
Ejecutar el servidor de desarrollo:
```bash
ng serve
```
El frontend estará disponible en:
```bash
http://localhost:4200
```

<br>

--- 

# 🛠 Versiones Utilizadas

El proyecto fue desarrollado y probado con las siguientes versiones:

- Java: 17
- Maven: 3.9.12
- IntelliJ IDEA
- Node: 24.13.1
- npm: 11.8.0
- Angular CLI: 21.1.4

<br>
 
---

# 🗄 Base de Datos

Se utiliza H2 Database en modo archivo para persistencia local o guardado temporal en memoria (A su concideración).

## 📍 Ubicación del archivo:
```bash
/data/pruebatecnica
```

<br>

## 🖥 Consola H2:

Disponible en:
```bash
http://localhost:8080/h2-console
```

Configuración para acceder:
```bash
JDBC URL: {jdbc:h2:file:./data/pruebatecnica} o {jdbc:h2:mem:pruebatecnica} 
User: {sa}
Password: (vacío por defecto)
```
JDBC URL depende de la configuración realizada en "application.properties", según sea para guardado local o en memoria.

<br>

---

# ❗ Simulación de Error

Se implementó una simulación controlada de errores en el endpoint:
```bash
GET /api/users?simulateError=true
```
Este mecanismo:

- Lanza una excepción personalizada en el backend.
- Es capturada por un @ControllerAdvice.
- Devuelve un HTTP 500 (Internal Server Error).
- Registra automáticamente el error en la base de datos.
- Es capturada y mostrada correctamente en el frontend.

<br>

---

# 🧠 Arquitectura del Proyecto

<br>

## 🔹Backend

Arquitectura en capas:
- Controller: Manejo de endpoints REST.
- Service: Lógica de negocio.
- Repository: Persistencia con JPA.
- Client: Consumo de API externa.
- Exception: Manejo global de excepciones.

Se implementó:
- Registro automático de logs.
- Manejo global de excepciones.
- Simulación controlada de errores.
- Separación clara de responsabilidades.

<br>

## 🔹Frontend

Estructura basada en:
- Pages
- Services
- Models

Características principales:
- Comunicación con backend mediante HttpClient.
- Manejo de errores HTTP diferenciando:
- Error de red (status 0).
- Error interno (500).
- Validaciones robustas en formularios.
- Modales para edición y eliminación.
- UI organizada y minimalista.

  
