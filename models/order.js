const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	orders: [
		{
			product: {
				type: mongoose.Types.ObjectId,
				required: true,
				ref: 'Product',
		    },
			quantity: {
				type: Number,
				required: true,
			},

	    },
		
	],
	customer: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Customer',
	},
});
module.exports = mongoose.model('Order', orderSchema);
