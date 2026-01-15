import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name should be required'],
    trim: true
  },
  email: {
    type: String,
    require: [true, 'email should be required'],
    unique: true,
    trim: true
  },
  number:{
    type: String,
    require: [true, 'Number should be required'],
    unique: true,
    trim: true
  },
  status:{
   type: String,
   default: 'Actice',
   enum: ['Active', 'Inactive']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ timestamps: true })

export const Contact = mongoose.model('Contact',contactSchema);

