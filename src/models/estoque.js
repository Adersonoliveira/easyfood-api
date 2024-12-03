class Estoque {
    constructor(id, nomeProduto, quantidade, precoUnitario) {
      this.id = id;
      this.nomeProduto = nomeProduto;
      this.quantidade = quantidade;
      this.precoUnitario = precoUnitario;
    }
  
    atualizarQuantidade(quantidade) {
      this.quantidade += quantidade;
    }
  }
  
  module.exports = Estoque;
  