// controllers/clientesController.js
const pool = require('../config/db');

exports.createCliente = async (req, res) => {
    try {
        const { nombre, telefono, email } = req.body;
        if (!nombre || !telefono || !email) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
        const [result] = await pool.query(
            "INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)",
            [nombre, telefono, email]
        );
        res.status(201).json({ message: 'Cliente registrado', clienteId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar cliente', error: error.message });
    }
};
