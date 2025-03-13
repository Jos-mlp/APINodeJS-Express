# API de Gestión de Reservas en un Restaurante

Esta API REST, desarrollada en Node.js utilizando Express y MySQL, permite gestionar las reservas de un restaurante. Se incluyen funcionalidades para crear clientes, mesas y reservas, consultar reservas, actualizar el estado y cancelar reservas, así como consultar la disponibilidad de mesas.

## Requisitos

- Node.js 
- MySQL

## Instalación y Configuración

1. **Clonar el Repositorio**
    ```bash
    git clone

2. **Instalar Dependencias**

   Ejecuta el siguiente comando en la raíz del proyecto:
   ```bash
   npm install

3. **Ejecuta el script de la BD**

    Se encuentra dentro de la carpeta BD

4. **Metodos:**

    ## Endpoints de la API

    | Método | Ruta                               | Descripción |
    | POST   | `/clientes`                        | Registra un nuevo cliente. Requiere en el body: `nombre`, `telefono` y `email`.                                                                      |


    ## Ejemplo de Prueba con Postman



### Probar Endpoints

#### A. Probar el Endpoint para Registrar un Cliente

1. **Crear una Nueva Solicitud:**
   - Método: `POST`
   - URL: `http://localhost:3000/clientes`

2. **Configurar el Body:**
   - Selecciona la pestaña **Body**.
   - Marca la opción **raw** y selecciona **JSON**.
   - Ingresa el siguiente contenido:
     ```json
     {
       "nombre": "Juan Pérez",
       "telefono": "1234567890",
       "email": "juanperez@example.com"
     }
     ```