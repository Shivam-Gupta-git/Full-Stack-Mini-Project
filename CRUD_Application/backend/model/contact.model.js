import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name should be required']
  },
  number:{
    type: String,
    require: [true, 'Number should be required'],
    unique: true
  }
},{ timestamps: true })

export const Contact = mongoose.model('Contact',contactSchema);

