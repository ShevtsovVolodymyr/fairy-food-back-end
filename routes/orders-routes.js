const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const ordersControllers = require('../controllers/orders-controller');

router.post(
	'/',
	[
		check('name').not().isEmpty(),
		check('address').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('phone').isMobilePhone(),
	],
	ordersControllers.createOrder
);

module.exports = router;
