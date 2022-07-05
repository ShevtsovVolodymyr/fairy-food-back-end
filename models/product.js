const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	company: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Company',
	},
});

module.exports = mongoose.model('Product', productSchema);
