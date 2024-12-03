const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta ao banco
mongoose.connect('mongodb+srv://andersonoliveira:gpPVn6Ew7UU8Dzsr@easyfood.e1vby.mongodb.net/?retryWrites=true&w=majority&appName=easyfood');

// Carregar dinamicamente todos os Models
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(file => {
  if (file.endsWith('.js')) {
    require(path.join(modelsPath, file));  
  }
});

// Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Rotas NF-e
const nfeRoutes = require('./routes/nfeRoutes');  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Usando as rotas existentes
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

// Usando as rotas de NF-e
app.use('/api/nfe', nfeRoutes);  

module.exports = app;
