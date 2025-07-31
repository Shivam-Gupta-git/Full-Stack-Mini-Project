// External module
const express = require('express')

const hostRouter = express.Router()

const hostController = require('../controllers/host-controllers');
hostRouter.get('/add-pictures', hostController.getaddPictures);
hostRouter.post('/added-pictures', hostController.postAddPictures);
hostRouter.get ('/host-picture-list', hostController.getHostPictureList)
hostRouter.get('/edit-pictures/:pictureId', hostController.getEditPictures)
hostRouter.post('/add-edited-picture', hostController.postEditPictures)
hostRouter.post('/delete-picture/:pictureId', hostController.postDeletePicture)
exports.hostRouter = hostRouter;