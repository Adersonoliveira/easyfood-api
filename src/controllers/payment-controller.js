const Payment = require('../models/payment');
const Cart = require('../models/cart');
const PaymentService = require('../services/paymentService');

// Realizar o pagamento
const processPayment = async (req, res) => {
  try {
    const { cartId, paymentMethod } = req.body;
    
    // Verifica o carrinho
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado.' });
    }

    // Processa o pagamento
    const paymentStatus = await PaymentService.processPayment(paymentMethod, cart.total);

    // Cria o pagamento no banco de dados
    const payment = new Payment({
      cartId,
      paymentMethod,
      paymentStatus: paymentStatus.success ? 'concluido' : 'falhou',
      amountPaid: cart.total,
      transactionId: paymentStatus.transactionId
    });

    await payment.save();

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar pagamento.' });
  }
};

module.exports = { processPayment };
