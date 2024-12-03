const express = require('express');
const router = express.Router();
const notaFiscalController = require('../controllers/notaFiscalController');

router.post('/notaFiscal', notaFiscalController.criarNotaFiscal);

router.get('/notasFiscais', notaFiscalController.listarNotasFiscais);

module.exports = router;
