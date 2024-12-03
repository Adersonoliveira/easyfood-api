class PaymentService {
    static async processPayment(paymentMethod, amount) {
      switch (paymentMethod) {
        case 'cartao_credito':
        case 'cartao_debito':
          return this.processCardPayment(amount);
        case 'pix':
          return this.processPixPayment(amount);
        case 'dinheiro':
          return this.processCashPayment(amount);
        default:
          throw new Error('Método de pagamento inválido');
      }
    }
  
    static async processCardPayment(amount) {
      const transactionId = Math.random().toString(36).substr(2, 9); 
      return { success: true, transactionId };
    }
  
    static async processPixPayment(amount) {
      const transactionId = Math.random().toString(36).substr(2, 9);
      return { success: true, transactionId };
    }
  
    static async processCashPayment(amount) {
      const transactionId = Math.random().toString(36).substr(2, 9); 
      return { success: true, transactionId };
    }
  }
  
  module.exports = PaymentService;
  