// routes/mesas.js
const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');

router.post('/', mesasController.createMesa);

module.exports = router;
