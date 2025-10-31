const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const token = authMiddleware.gerarToken({ email: req.body.usuario });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro interno' });
  }
});

router.post('/renovar', authMiddleware.verificarToken, (req, res) => {
  try {
    const token = authMiddleware.gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro interno' });
  }
});

module.exports = router;