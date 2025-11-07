const mongoose = require("mongoose");
const Favourite = require('./modelsFavourites')

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  photoUrl: String,
  description: String,
});

// Using Pre Hook For Deleting Items in every Where

homeSchema.pre('findOneAndDelete', async function(next){
  const homeId = this.getQuery._id;
  await Favourite.deleteMany({houseId: homeId})
  next();
})

module.exports = mongoose.model("Home", homeSchema);
