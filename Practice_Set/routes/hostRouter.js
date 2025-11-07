// External module
const express = require('express')
const hostRouter = express()

// Local modules
const hostController = require('../controllers/hostController')

hostRouter.get('/add-home-page', hostController.getAddHomes)
hostRouter.post('/showMessage-page', hostController.postAddedHomes);
hostRouter.get('/host-home-list', hostController.getHostHomesList);
hostRouter.get('/host/addHomes/:homeId', hostController.getEditHomes)
hostRouter.post('/edit-homes', hostController.postEditHomes)
hostRouter.post('/host/delete-home/:homeId', hostController.postDeleteHome)
exports.hostRouter = hostRouter;