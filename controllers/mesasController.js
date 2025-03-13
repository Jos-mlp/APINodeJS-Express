// controllers/mesasController.js
const pool = require('../config/db');

exports.createMesa = async (req, res) => {
    try {
        const { numero, capacidad } = req.body;
        if (!numero || !capacidad) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
        if (capacidad <= 0) {
            return res.status(400).json({ message: 'La capacidad debe ser mayor a 0' });
        }
        const [result] = await pool.query(
            "INSERT INTO mesas (numero, capacidad) VALUES (?, ?)",
            [numero, capacidad]
        );
        res.status(201).json({ message: 'Mesa registrada', mesaId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar mesa', error: error.message });
    }
};
