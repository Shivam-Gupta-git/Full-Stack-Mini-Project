// External module
const express = require('express')

const hostRouter = express.Router()

const hostControllers = require('../controllers/host-controllers')

hostRouter.get('/add-books', hostControllers.getAddBooks)
hostRouter.post('/added-books', hostControllers.postAddedBooks)
hostRouter.get('/host-book-list', hostControllers.getHostBookList)
hostRouter.get('/book-details/:bookId', hostControllers.getHostBookDetails)
hostRouter.get('/edit-details/:hostDetailBooksId', hostControllers.getHostEditDetails)
hostRouter.post('/updated-books', hostControllers.postHostEditedDetails)
hostRouter.post('/delete-details/:hostDetailBooksId', hostControllers.postDeleteBookDetails)
hostRouter.post('/delete-review/:reviewId', hostControllers.postDeleteBookReview)

exports.hostRouter = hostRouter