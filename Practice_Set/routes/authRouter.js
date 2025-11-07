// External module
const express = require('express')
const authRouter = express()

const authController = require('../controllers/authController')

authRouter.get('/login', authController.getLogin)
authRouter.post('/login',authController.postLogin)
authRouter.post('/logout', authController.postLogOut)
authRouter.get('/signup', authController.getSingUn)
authRouter.post('/signup', authController.postSignUp)

exports.authRouter = authRouter;