const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const Order = require('../models/order');
const Customer = require('../models/customer');
const HttpError = require('../models/http-error');

const createOrder = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422);
		return next(
			new HttpError('Invalid datafields, please check your data', 422)
		);
	}

	const {name, email, address, phone, orders} = req.body;

	let customer;

	try {
		customer = await Customer.findOne({email});
	} catch (err) {
		const error = new HttpError(
			'Something went wrong while finding a customer',
			500
		);
		return next(error);
	}

	if (!customer) {
		customer = new Customer({
			name,
			email,
			address,
			phone,
			orders:[],
		});
	} else {
		customer.name = name;
		customer.phone = phone;
		customer.address = address;
	}

	const newOrder = new Order({
		orders,
		customer: customer.id,
	});

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		customer.orders.push(newOrder);
		await customer.save({session: session});
		await newOrder.save({session: session});
		await session.commitTransaction();
	} catch (err) {
		const error = new HttpError('Saving an order failed', 500);
		return next(error);
	}
	
	res.status(201).json({
		message: 'New order created',
		order: newOrder.toObject({getters: true}),
	});
};

exports.createOrder = createOrder;
