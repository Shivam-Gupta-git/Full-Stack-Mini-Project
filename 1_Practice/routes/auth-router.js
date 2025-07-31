const express = require('express')

const authRouter = express.Router();

const authController = require('../controllers/auth-controllers')

authRouter.get('/login', authController.getLogin)
authRouter.post('/login', authController.postLogin)
authRouter.post('/logout', authController.postLogout)
authRouter.get('/signup', authController.getsignup)
authRouter.post('/signup', authController.postSignup)
exports.authRouter = authRouter;