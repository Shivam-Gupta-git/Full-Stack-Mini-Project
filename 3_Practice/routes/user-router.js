// External module 
const express = require('express')

const userRouter = express.Router()

const userControllers = require('../controllers/user-controllers')

userRouter.get("/home", userControllers.getHomePage)
userRouter.get('/book-list', userControllers.getBookList)
userRouter.get('/book-details/:bookId', userControllers.getBookDetails)
userRouter.post('/book-reviews', userControllers.postBookReciews)
userRouter.get('/add-to-wishlist', userControllers.getAddToWishlist)
userRouter.post('/add-to-wishlist-items/:bookDetailItemId', userControllers.postAddedToWishlist)
userRouter.post('/remove-to-wishlist/:bookId', userControllers.postRemoveToWishlist)
userRouter.get('/add-to-cart', userControllers.getAddToCart)
userRouter.post('/add-to-cart-items/:bookDetailItemId', userControllers.postAddedToCart)
userRouter.post('/remove-to-cart/:bookId', userControllers.postRemoveToCart)
exports.userRouter = userRouter