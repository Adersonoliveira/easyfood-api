const NotaFiscal = require('../models/notaFiscal');
const Estoque = require('../models/estoque');

let notasFiscais = [];
let estoqueProdutos = [];

const criarNotaFiscal = (req, res) => {
  const { id, dataEmissao, produtos } = req.body;

  let valorTotal = 0;
  produtos.forEach(produto => {
    const estoqueProduto = estoqueProdutos.find(p => p.id === produto.id);
    if (estoqueProduto && estoqueProduto.quantidade >= produto.quantidade) {
      estoqueProduto.atualizarQuantidade(-produto.quantidade); // Atualiza o estoque
      valorTotal += produto.preco * produto.quantidade;
    } else {
      return res.status(400).json({ error: 'Produto fora de estoque ou quantidade insuficiente.' });
    }
  });

  const novaNota = new NotaFiscal(id, dataEmissao, produtos, valorTotal);
  notasFiscais.push(novaNota);
  res.status(201).json(novaNota);
};

const listarNotasFiscais = (req, res) => {
  res.status(200).json(notasFiscais);
};

const atualizarEstoque = (req, res) => {
  const { id, quantidade } = req.body;
  const produto = estoqueProdutos.find(p => p.id === id);

  if (produto) {
    produto.atualizarQuantidade(quantidade);
    res.status(200).json(produto);
  } else {
    res.status(404).json({ error: 'Produto não encontrado.' });
  }
};

const listarEstoque = (req, res) => {
  res.status(200).json(estoqueProdutos);
};

module.exports = {
  criarNotaFiscal,
  listarNotasFiscais,
  atualizarEstoque,
  listarEstoque
};
