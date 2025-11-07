// External module
const express = require('express')
const storeRouter = express.Router()

// Local module
const storeController = require('../controllers/storeController')

storeRouter.get('/', storeController.getIndex)
storeRouter.get("/homelist", storeController.getHomeslist)
storeRouter.get('/bookings', storeController.getbookings)
storeRouter.get('/favourites', storeController.getFavouriteList)
storeRouter.get('/homelist/:homeId', storeController.getHomeDetails)
storeRouter.post('/favourites', storeController.postAddToFavouriteList)
storeRouter.post('/remove-to-favourite/:homeId', storeController.postRemoveFavouriteHome)

exports.storeRouter = storeRouter;