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

| Método | Ruta                               | Descripción                                                                                                                                           |
|--------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | `/clientes`                        | Registra un nuevo cliente. Requiere en el body: `nombre`, `telefono` y `email`.                                                                      |
| POST   | `/mesas`                           | Registra una nueva mesa. Requiere en el body: `numero` y `capacidad`.                                                                                  |
| POST   | `/reservas`                        | Crea una nueva reserva. Requiere en el body: `cliente_id`, `mesa_id`, `fecha` (formato YYYY-MM-DD) y `hora` (formato HH:MM:SS).<br>**Validaciones:**<br>- Un cliente solo puede tener una reserva activa en la misma fecha.<br>- Una mesa no puede estar reservada dos veces a la misma hora (siempre que la reserva no esté cancelada). |
| GET    | `/reservas`                        | Obtiene todas las reservas registradas, incluyendo información del cliente y de la mesa.                                                              |
| PUT    | `/reservas/{id}`                   | Actualiza el estado de una reserva (valores permitidos: `pendiente`, `confirmada` o `cancelada`).<br>Reemplaza `{id}` por el ID de la reserva.      |
| DELETE | `/reservas/{id}`                   | Cancela una reserva actualizando su estado a `cancelada`.<br>Reemplaza `{id}` por el ID de la reserva a cancelar.                                       |
| GET    | `/reservas/disponibilidad`         | Consulta la disponibilidad de mesas para una fecha y hora específica.<br>Requiere pasar los parámetros de query `fecha` (YYYY-MM-DD) y `hora` (HH:MM:SS). |


