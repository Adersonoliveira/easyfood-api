const express = require('express');
const router = express.Router();
const notaFiscalController = require('../controllers/notaFiscalController');

router.get('/estoque', notaFiscalController.listarEstoque);

router.put('/estoque', notaFiscalController.atualizarEstoque);

module.exports = router;
