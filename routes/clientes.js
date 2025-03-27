const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *               - email
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               telefono:
 *                 type: string
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 example: juanperez@example.com
 *     responses:
 *       201:
 *         description: Cliente registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 clienteId:
 *                   type: number
 *       400:
 *         description: Faltan datos requeridos
 *       500:
 *         description: Error al registrar cliente
 */
router.post('/', clientesController.createCliente);

module.exports = router;
