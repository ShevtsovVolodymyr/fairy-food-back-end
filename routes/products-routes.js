const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/products-controller');

router.get('/', productsControllers.getProducts);
router.get('/:company', productsControllers.getProductsByCompany);

module.exports = router;
