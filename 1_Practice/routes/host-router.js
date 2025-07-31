const express = require('express')

const hostRouter = express.Router()

const hostController = require('../controllers/host-controllers')

hostRouter.get('/add-items', hostController.getAddItems)

exports.hostRouter = hostRouter;