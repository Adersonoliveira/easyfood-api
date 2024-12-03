const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },  // Relacionamento com o carrinho
  paymentMethod: { type: String, required: true, enum: ['cartao_credito', 'cartao_debito', 'pix', 'dinheiro'] },
  paymentStatus: { type: String, required: true, enum: ['pendente', 'concluido', 'falhou'] },
  amountPaid: { type: Number, required: true },
  transactionId: { type: String },  // Pode ser um ID de transação do gateway de pagamento
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
