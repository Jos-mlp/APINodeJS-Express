// routes/reservas.js
const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.post('/', reservasController.createReserva);
router.get('/', reservasController.getReservas);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);
router.get('/disponibilidad', reservasController.getDisponibilidad);

module.exports = router;
