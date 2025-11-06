const mongoose = require('mongoose')

const wishlistBookScheema = mongoose.Schema({
  bookDetailItemId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Books',
    require: true,
    unique: true,
  }
})
module.exports = mongoose.model('WishlistBook', wishlistBookScheema);