const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Realizar pagamento
router.post('/process', paymentController.processPayment);

module.exports = router;
