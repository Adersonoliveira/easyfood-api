const Cart = require('../models/cart');
const Product = require('../models/product');

// Adicionar item ao carrinho
const addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Verifica se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Busca ou cria um novo carrinho para o usuário
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    // Verifica se o item já existe no carrinho
    const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Atualiza o total
    cart.total = cart.items.reduce((total, item) => {
      const itemPrice = product.price; // Supondo que o preço esteja no produto
      return total + itemPrice * item.quantity;
    }, 0);

    // Salva o carrinho
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar item ao carrinho.' });
  }
};

// Visualizar o carrinho
const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado.' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao visualizar carrinho.' });
  }
};

module.exports = { addItemToCart, viewCart };
