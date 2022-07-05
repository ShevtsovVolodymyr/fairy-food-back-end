const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  ],
});
module.exports = mongoose.model('Company', companySchema);
