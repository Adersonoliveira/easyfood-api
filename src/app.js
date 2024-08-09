const express = require('express');

const app = express();
const router = express.Router();

const route  = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'easyfood-api',
    version: '1.0',
  });
});
app.use('/', route);

module.exports = app;