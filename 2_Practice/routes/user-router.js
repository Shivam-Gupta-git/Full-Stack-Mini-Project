// External module
const express = require('express')

const userRouter = express.Router()

const userController = require('../controllers/user-controllers')

userRouter.get('/', userController.getHomePage)
userRouter.get('/pictures-list', userController.getPicturesList)

exports.userRouter = userRouter