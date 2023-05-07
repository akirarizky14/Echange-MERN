const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
  bank_country: {
    type: String,
    required:true,
  },
  bank_name:{
    type: String,
    required:true,
  },
  bank_number: {
    type: Number,
    required: true,
    unique: true,
  },
  expired_card: {
    type: Number,
    required: true
  },
  cvc_number:{
    type:Number,
    required:true,
  },
  user_id:{
    type:String,
    required:true,
  }
});


const Bank_Details = mongoose.model('Bank_Details', bankSchema);

module.exports = Bank_Details;
