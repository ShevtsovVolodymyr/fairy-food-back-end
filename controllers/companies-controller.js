const HttpError = require('../models/http-error');

const Company = require('../models/company');

const getCompanies = async (req, res, next) => {
	let companies;

	try {
		companies = await Company.find();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong while getting companies.',
			500
		);
		return next(error);
	}

	if (!companies) {
		const error = new HttpError('No companies available.', 404);
		return next(error);
	}
    // res.header('Access-Control-Allow-Origin', '*');
	res.status(200).json({
		companies: companies.map(company => company.toObject({getters: true})),
	});
};


exports.getCompanies = getCompanies;
