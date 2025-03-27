const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');

/**
 * @swagger
 * tags:
 *   name: Mesas
 *   description: Gestión de mesas
 */

/**
 * @swagger
 * /mesas:
 *   post:
 *     summary: Crear una mesa
 *     tags: [Mesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - capacidad
 *             properties:
 *               numero:
 *                 type: number
 *                 example: 1
 *               capacidad:
 *                 type: number
 *                 example: 4
 *     responses:
 *       201:
 *         description: Mesa registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mesaId:
 *                   type: number
 *       400:
 *         description: Faltan datos requeridos o capacidad inválida
 *       500:
 *         description: Error al registrar mesa
 */
router.post('/', mesasController.createMesa);

module.exports = router;
