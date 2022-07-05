const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	orders: [
		{
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Order',
		},
	],
});
customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);
