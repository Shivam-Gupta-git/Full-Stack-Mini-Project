const mongoose = require('mongoose')

const UserScheema = mongoose.Schema({
  firstName:{
    type: String,
    require: [true, 'First Name is require']
  },
  lastName:{
    type: String
  },
  email:{
    type: String,
    require: [true, 'Email is require'],
    unique: true
  },
  userPassword:{
    type: String,
    require: [true, 'User Password is require']
  },
  userType:{
    type: String,
    enum: ['guest', 'host'],
    default: 'geust'
  },
  wishlistItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books'
  }], 
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books'
  }]
})
module.exports = mongoose.model('User', UserScheema)