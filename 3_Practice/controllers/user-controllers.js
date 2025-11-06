const Reviews = require("../models/review-models");
const Books = require("../models/home-model");
const WishlistBook = require('../models/wishlist-model')
const CartBook = require('../models/cart-model')
const User = require('../models/user-model')

exports.getHomePage = (req, res, next) => {
  res.render("user/home", {
    PageTitle: "Home Page",
    currentPage: "Home Page",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};
exports.getBookList = (req, res, next) => {
  Books.find().then((bookItems) => {
    res.render("user/book-list", {
      PageTitle: "Book List",
      currentPage: "Book List",
      bookItems: bookItems,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });
  });
};

exports.getBookDetails = (req, res, next) => {
  const bookId = req.params.bookId;
  Books.findById(bookId).then((bookDetailItem) => {
    Reviews.find({ bookId: bookId }).then((reviews) => {
      res.render("user/book-details", {
        PageTitle: "Book Details",
        currentPage: "Book List",
        bookDetailItem: bookDetailItem,
        reviews: reviews,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
    });
  });
};

exports.postBookReciews = (req, res, next) => {
  // console.log(req.body);
  const { BookReviews, rating, id } = req.body;
  const reciewsBooks = new Reviews({
    BookReviews,
    rating,
    bookId: id,
  });
  reciewsBooks.save().then(() => {
    console.log("Book Reviews saved sucessfully");
    res.redirect("/user/book-details/" + id);
  });
};

exports.getAddToWishlist = async (req, res, next) => {
  const userId = req.session.user._id
  const user = await User.findById(userId).populate('wishlistItems')
  res.render('user/add-to-wishlist', {
  wishlistBooks: user.wishlistItems,
  PageTitle: 'Wishlist',
  currentPage: 'Wishlist',
  isLoggedIn: req.isLoggedIn,
  user: req.session.user
 })
}
exports.postAddedToWishlist = async (req, res, next) => {
  const bookDetailItemId = req.params.bookDetailItemId
  const userId = req.session.user._id
  const user = await User.findById(userId)
  if(!user.wishlistItems.includes(bookDetailItemId)){
    user.wishlistItems.push(bookDetailItemId)
    await user.save()
  }
    res.redirect('/user/add-to-wishlist')
  }

exports.postRemoveToWishlist = async (req, res, next) => {
  const bookId = req.params.bookId
  const userId = req.session.user._id
  const user = await User.findById(userId)
  if(user.wishlistItems.includes(bookId)){
    user.wishlistItems = user.wishlistItems.filter(item => item != bookId)
      await user.save()
    }
    res.redirect('/user/add-to-wishlist')
  }

exports.getAddToCart = async (req, res, next) => {
  const userId = req.session.user._id
  const user = await User.findById(userId).populate('cartItems')
  // console.log('userId', user)
        res.render('user/add-to-cart',{
          PageTitle: 'Cart',
          currentPage: 'Cart',
          cartBookItems: user.cartItems,
          isLoggedIn: req.isLoggedIn,
          user: req.session.user
        })
    }

exports.postAddedToCart = async (req, res, next) => {
  const bookDetailItemId = req.params.bookDetailItemId
  const userId = req.session.user._id
  const user = await User.findById(userId)
  if(!user.cartItems.includes(bookDetailItemId)){
    user.cartItems.push(bookDetailItemId)
    await user.save()
  }
    res.redirect('/user/add-to-cart')
  }


exports.postRemoveToCart = async (req, res, next) => {
  const bookId = req.params.bookId;
  const userId = req.session.user._id
  const user = await User.findById(userId)
  if(user.cartItems.includes(bookId)){
    user.cartItems = user.cartItems.filter(item => item != bookId)
    await user.save()
  }
    res.redirect('/user/add-to-cart')
}