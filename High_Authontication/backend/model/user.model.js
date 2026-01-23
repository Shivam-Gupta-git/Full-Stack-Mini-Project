import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    require: [true, 'userName should be required'],
    unique: true,
    tolowerCase: true
  },
  email:{
    type: String,
    require: [true, 'email should be required'],
    unique: true,
    tolowerCase: true
  },
  password:{
   type: String,
   require: [true, 'Password should be required'],
   unique: true
  },
  isVerified:{
   type: Boolean,
   default: false
  },
  isLoggedIn:{
    type: Boolean,
    default: false
  },
  token:{
    type: String,
    default: null
  },
  otp:{
    type: String,
    default: null
  },
  expOTP:{
   type: Date,
   default: null
  }
},{timestamps: true})

export const User = mongoose.model('User', userSchema)