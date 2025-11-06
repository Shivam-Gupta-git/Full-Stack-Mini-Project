const mongoose = require('mongoose')

const BooksScheema = mongoose.Schema({
  BookName:{
    type: String,
    require: true
  }, 
  BookImageUrl:{
   type: String
  },
  picture:{
   type: String
  },
  BookCategory:{
   type: String,
   require: true
  },
  CurrentPrice:{
    type: String,
    require: true
  },
  OriginalPrice:{
    type: String,
    require: true
  }, 
  Discount:{
    type: String
  }, 
  BookAuther:{
    type: String
  },
  BookSeller:{
    type: String
  },
  BookHighlights:{
    type: String
  },
  BookDescription:{
    type: String
  },
  BookBinding:{
    type: String
  },
  Bookdate:{
    type: String
  },
  Publisher:{
    type: String
  },
  Edition:{
    type: String
  },
  NumberOfPages:{
    type: String
  },
  BookLanguage:{
    type: String
  },
  
})

module.exports = mongoose.model('Books', BooksScheema)