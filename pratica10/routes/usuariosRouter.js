const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', usuariosController.criar);

module.exports = router;