const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orders_id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currencyfrom: {
    type: String,
    required: true
  },
  currencyto: {
    type: String,
    required: true
  },
  bank_countryfrom: {
    type: String,
    required: true
  },
  bank_countryto: {
    type: String,
    required: true
  },
  bank_namefrom: {
    type: String,
    required: true
  },
  bank_nameto: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Done', 'Reject'],
    required: true
  },
  completed_at: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model('History', historySchema);

module.exports = History;
