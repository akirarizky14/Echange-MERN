const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  user_id: {
    type: String,
    ref: 'User_Exchange',
  },
  orders_id: {
    type: Number,
  },
  amount: {
    type: Number,
    required:true
  },
  currencyfrom: {
    type: String,
    minlength: 2,
    required:true,
  },
  currencyto: {
    type: String,
    minlength: 2,
    required:true,
  },
  bank_countryto: {
    type: String,
    minlength: 2,
    required:true,
  },
  bank_countryfrom: {
    type: String,
    minlength: 2,
    required:true,
  },
  bank_nameto: {
    type: String,
    minlength: 2,
    required:true,
  },
  bank_namefrom: {
    type: String,
    minlength: 2,
    required:true,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Done','Reject'],
    default: 'In Progress',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exchange', exchangeSchema);
