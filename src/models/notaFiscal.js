class NotaFiscal {
    constructor(id, dataEmissao, produtos, valorTotal) {
      this.id = id;
      this.dataEmissao = dataEmissao;
      this.produtos = produtos; 
      this.valorTotal = valorTotal;
    }
  
    calcularValorTotal() {
      return this.produtos.reduce((total, produto) => {
        return total + (produto.preco * produto.quantidade);
      }, 0);
    }
  }
  
  module.exports = NotaFiscal;
  