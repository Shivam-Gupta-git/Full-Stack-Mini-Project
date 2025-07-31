const mongoose = require('mongoose')

const pictureSchema = mongoose.Schema({
  pictureName: {
    type: String,
    require: true
  }, 
  description: {
    type: String
  },
  picture: String
})

module.exports = mongoose.model("Picture", pictureSchema)