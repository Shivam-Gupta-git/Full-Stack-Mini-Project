const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstName:{
    type: String,
    require: [true, 'First Name is require']
  },
  lastName: {
    type: String
  },
  email: {
   type: String,
   require: [true, 'Email is require'],
   unique: true
  },
  userPassword: {
   type: String,
   require: [true, 'Password is require']
  },
  userType: {
    type: String,
    enum: ['guest', 'host'],
    default: 'geust'
  } 
})

module.exports = mongoose.model('User', userSchema)