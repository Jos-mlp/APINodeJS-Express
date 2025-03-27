const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas",
      version: "1.0.0",
      description: "Documentación de la API para gestionar clientes, mesas y reservas",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"], // Archivos donde definimos las rutas con Swagger
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Documentación disponible en: http://localhost:3000/api-docs");
};

module.exports = swaggerDocs;
