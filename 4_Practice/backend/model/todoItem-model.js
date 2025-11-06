const mongoose = require('mongoose')

const todoItemsSchema = mongoose.Schema(
  {
  task:{
    type: String,
    require: true
  },
  date:{
    type: Date
  },
  completed:{
    type: Boolean,
    default: false
  },  
}, 
{timestamps: true}
)
module.exports = mongoose.model('Todo', todoItemsSchema)