// app.js
const express = require('express');
const app = express();

app.use(express.json());

// Importar rutas
const clientesRoutes = require('./routes/clientes');
const mesasRoutes = require('./routes/mesas');
const reservasRoutes = require('./routes/reservas');

// Configurar endpoints
app.use('/clientes', clientesRoutes);
app.use('/mesas', mesasRoutes);
app.use('/reservas', reservasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
