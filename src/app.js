const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta ao banco
mongoose.connect('mongodb+srv://andersonoliveira:gpPVn6Ew7UU8Dzsr@easyfood.e1vby.mongodb.net/?retryWrites=true&w=majority&appName=easyfood');

// Carrega os Models
const Product = require('./models/product');

// Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

// Rotas NF-e
const nfeRoutes = require('./routes/nfeRoutes');  // Rota para a NF-e

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Usando as rotas existentes
app.use('/', indexRoute);
app.use('/products', productRoute);

// Usando as rotas de NF-e
app.use('/api/nfe', nfeRoutes);  

module.exports = app;
