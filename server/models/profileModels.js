const mongoose = require('mongoose')
const Schema = mongoose.Schema
const profileSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  first_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  phone_number: {
    type: String,
    required: true,
    maxlength: 20,
  },
  country: {
    type: String,
    required: true,
    maxlength: 50,
  },
  docs_number: {
    type: String,
    required: true,
    maxlength: 50,
  },
  docs_type: {
    type: String,
    required: true,
    maxlength: 10,
  },
  docs_photo:{
    data: Buffer,
    contentType: String
  },
  user_id:{
    type: String,
    ref : 'User_Exchange',
  }
})


module.exports = mongoose.model('profile_Exchange', profileSchema)