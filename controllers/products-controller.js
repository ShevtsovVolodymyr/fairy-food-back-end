const HttpError = require('../models/http-error');

const Product = require('../models/product');

const getProducts = async (req, res, next) => {
	let products;

	try {
		products = await Product.find();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong while getting products.',
			500
		);
		return next(error);
	}

	if (!products) {
		const error = new HttpError('No products available.', 404);
		return next(error);
	}
	// res.header('Access-Control-Allow-Origin', '*');
	res.status(200).json({
		products: products.map(product => product.toObject({getters: true})),
	});
};

const getProductsByCompany = async (req, res, next) => {
	const company = req.params.company;
	let products;

	try {
		products = await Product.find({company});
	} catch (err) {
		return next(
			new HttpError(
				'Something went wrong while getting companies products.',
				500
			)
		);
	}

	if (!products) {
		const error = new HttpError('No products available.', 404);
		return next(error);
	}

	res.status(200).json({
		products: products.map(product => product.toObject({getters: true})),
	});
};

exports.getProducts = getProducts;
exports.getProductsByCompany = getProductsByCompany;
