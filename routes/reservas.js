const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de reservas
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente_id
 *               - mesa_id
 *               - fecha
 *               - hora
 *             properties:
 *               cliente_id:
 *                 type: number
 *                 example: 1
 *               mesa_id:
 *                 type: number
 *                 example: 2
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *               hora:
 *                 type: string
 *                 example: "20:00"
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservaId:
 *                   type: number
 *       400:
 *         description: Faltan datos requeridos o error de validación
 *       500:
 *         description: Error al crear reserva
 */
router.post('/', reservasController.createReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error al obtener reservas
 */
router.get('/', reservasController.getReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar el estado de una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, confirmada, cancelada]
 *                 example: confirmada
 *     responses:
 *       200:
 *         description: Estado de reserva actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al actualizar reserva
 */
router.put('/:id', reservasController.updateReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Cancelar una reserva (cambia el estado a 'cancelada')
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a cancelar
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Reserva cancelada exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al cancelar reserva
 */
router.delete('/:id', reservasController.deleteReserva);

/**
 * @swagger
 * /reservas/disponibilidad:
 *   get:
 *     summary: Obtener mesas disponibles para una fecha y hora específicas
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: true
 *         description: Fecha de la reserva (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *       - in: query
 *         name: hora
 *         required: true
 *         description: Hora de la reserva (HH:mm)
 *         schema:
 *           type: string
 *           example: "20:00"
 *     responses:
 *       200:
 *         description: Lista de mesas disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Falta de parámetros
 *       500:
 *         description: Error al consultar disponibilidad
 */
router.get('/disponibilidad', reservasController.getDisponibilidad);

module.exports = router;
