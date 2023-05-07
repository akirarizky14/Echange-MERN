  const mongoose = require('mongoose')
  const bcrypt = require('bcrypt')
  const validator = require('validator')
  const Schema = mongoose.Schema

  const userSchema = new Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true
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
    role:{
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }
  })

  // static signup method
  userSchema.statics.signup = async function(email, password,first_name,last_name,phone_number,country,docs_number,docs_type,role) {

    // validation
    if (!email || !password || !first_name || !last_name || !phone_number || !country || !docs_number || !docs_type) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ 
      email, password: hash,first_name,last_name,phone_number,country,docs_number,docs_type,role })
  
    return user
  }

  // static login method
  userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }

    return user
  }
  // // change password
  userSchema.statics.changePassword = async function(email,password,newPassword){
      if (!email || !password || !newPassword) {
          throw Error('All fields must be filled')
      }

      const user = await this.findOne({ email })
      if (!user) {
          throw Error('Incorrect email')
      }
      
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
          throw Error('Incorrect password')
      }
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

        if (!validator.isStrongPassword(newPassword)) {
          throw Error('Password not strong enough')
        }
      user.password = hash;
      await user.save();
    
      return user;
  };

  // delete userone
  userSchema.statics.deleteUserone = async function(email){
      const user = await this.findOne({ email })
      if (!user) {
          throw Error('Incorrect email')
      }
      return user;
  }
    
  module.exports = mongoose.model('User_Exchange', userSchema)