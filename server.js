const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const productsRoutes = require('./routes/products-routes');
const ordersRoutes = require('./routes/orders-routes');
const companiesRoutes = require('./routes/companies-routes');
const HttpError = require('./models/http-error');

const server = express();

server.use(cors());

server.use(bodyParser.json());

server.use('/api/products', productsRoutes);

server.use('/api/orders', ordersRoutes);

server.use('/api/companies', companiesRoutes);

server.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});
server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occured!' });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lze6sty.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
