const mongoose = require('mongoose')

const CartBookScheema = mongoose.Schema({
  bookDetailItemId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Books',
    require: true,
    unique: true
  }
})
module.exports = mongoose.model('CartBook', CartBookScheema)