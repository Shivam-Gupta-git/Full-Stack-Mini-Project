const mongoose = require('mongoose')

const homeFavouriteSchema = mongoose.Schema({
   houseId:{
      type: mongoose.Schema.ObjectId,
      ref: 'Home',
      require: true,
      unique: true,
   }
})
module.exports = mongoose.model('Favourite', homeFavouriteSchema);