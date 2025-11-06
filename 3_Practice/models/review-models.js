const mongoose = require("mongoose");

const BookReviewsScheema = mongoose.Schema({
  BookReviews: {
    type: String,
  },
  rating: {
    type: String,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
});
module.exports = mongoose.model("Review", BookReviewsScheema);
