// controllers/reservasController.js
const pool = require('../config/db');

exports.createReserva = async (req, res) => {
    try {
        const { cliente_id, mesa_id, fecha, hora } = req.body;
        if (!cliente_id || !mesa_id || !fecha || !hora) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Validar que el cliente no tenga otra reserva activa (estado distinto de cancelada) en la misma fecha
        const [clienteReserva] = await pool.query(
            "SELECT * FROM reservas WHERE cliente_id = ? AND fecha = ? AND estado != 'cancelada'",
            [cliente_id, fecha]
        );
        if (clienteReserva.length > 0) {
            return res.status(400).json({ message: 'El cliente ya tiene una reserva activa para esa fecha' });
        }

        // Validar que la mesa esté disponible en la fecha y hora especificadas (estado distinto de cancelada)
        const [mesaReserva] = await pool.query(
            "SELECT * FROM reservas WHERE mesa_id = ? AND fecha = ? AND hora = ? AND estado != 'cancelada'",
            [mesa_id, fecha, hora]
        );
        if (mesaReserva.length > 0) {
            return res.status(400).json({ message: 'La mesa ya está reservada para esa fecha y hora' });
        }

        // Insertar la reserva
        const [result] = await pool.query(
            "INSERT INTO reservas (cliente_id, mesa_id, fecha, hora) VALUES (?, ?, ?, ?)",
            [cliente_id, mesa_id, fecha, hora]
        );
        res.status(201).json({ message: 'Reserva creada', reservaId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear reserva', error: error.message });
    }
};

exports.getReservas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT r.*, 
                    c.nombre AS cliente_nombre, c.telefono AS cliente_telefono, c.email AS cliente_email, 
                    m.numero AS mesa_numero, m.capacidad AS mesa_capacidad 
             FROM reservas r 
             JOIN clientes c ON r.cliente_id = c.id 
             JOIN mesas m ON r.mesa_id = m.id`
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservas', error: error.message });
    }
};

exports.updateReserva = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const { estado } = req.body;
        if (!estado || !['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido. Debe ser pendiente, confirmada o cancelada' });
        }
        const [result] = await pool.query(
            "UPDATE reservas SET estado = ? WHERE id = ?",
            [estado, reservaId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Estado de reserva actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar reserva', error: error.message });
    }
};

exports.deleteReserva = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const [result] = await pool.query(
            "UPDATE reservas SET estado = 'cancelada' WHERE id = ?",
            [reservaId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar reserva', error: error.message });
    }
};

exports.getDisponibilidad = async (req, res) => {
    try {
        const { fecha, hora } = req.query;
        if (!fecha || !hora) {
            return res.status(400).json({ message: 'Debe proporcionar fecha y hora' });
        }
        const [rows] = await pool.query(
            `SELECT * FROM mesas WHERE id NOT IN (
                SELECT mesa_id FROM reservas WHERE fecha = ? AND hora = ? AND estado != 'cancelada'
            )`,
            [fecha, hora]
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar disponibilidad', error: error.message });
    }
};
