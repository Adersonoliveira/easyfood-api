const express = require('express');
const router = express.Router();
const nfeController = require('../controllers/nfeController');

router.post('/emitir-nfe', nfeController.emitirNfe);

router.get('/consultar-nfe/:chave', nfeController.consultarNfe);

module.exports = router;
