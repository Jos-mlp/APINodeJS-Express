const express = require("express");
const app = express();
const swaggerDocs = require("./swagger"); // Importar Swagger

app.use(express.json());

// Importar rutas
const clientesRoutes = require("./routes/clientes");
const mesasRoutes = require("./routes/mesas");
const reservasRoutes = require("./routes/reservas");

// Configurar endpoints
app.use("/clientes", clientesRoutes);
app.use("/mesas", mesasRoutes);
app.use("/reservas", reservasRoutes);

// Iniciar documentación de Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} , server: http://localhost:3000`);
});
