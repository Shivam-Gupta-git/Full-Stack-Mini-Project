// External module
const express = require('express')

const userRouter = express.Router()

const userControllers = require('../controllers/user-contollers')

userRouter.get('/home', userControllers.getHomePage)

exports.userRouter = userRouter

