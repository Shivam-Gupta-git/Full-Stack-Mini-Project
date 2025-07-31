const fs = require('fs')
const Picture = require('../models/Picture-model')
exports.getaddPictures = (req, res, next) => {
  res.render('host/addPictures',{
    PageTitle: 'Add Pictures', 
    currentPage: 'Add Pictures',
    editing: false
  })
}

exports.postAddPictures =  (req, res, next) => {
 const {pictureName, description} = req.body;
 
 if(!req.file){
   return res.status(422).send('No Image Provided')
  }
 const picture = req.file.path
 const pictures = new Picture({
  picture,
  pictureName, 
  description, 
});

 pictures.save().then(()=>{
  console.log('Picture saved sucessfully')
 })
 res.redirect('/pictures-list')
}
exports.getHostPictureList = (req, res, next) => {
  Picture.find().then((addedPictures) => {
   res.render('host/host-picture-list',{
    PageTitle: 'Host Picture List',
    currentPage: 'Host Picture List',
    addedPictures: addedPictures
  })
 }
)}
exports.getEditPictures = (req, res, next) => {
  const pictureId = req.params.pictureId;
  const editing = req.query.editing === 'true'
  Picture.findById(pictureId).then((picture)=>{
    if(!picture){
      res.redirect('host/host-picture-list')
    }
    res.render('host/addPictures', {
      PageTitle: 'Edit Picture',
      currentPage:'Host Picture List',
      editing: editing,
      picture: picture
    })
  })
}

exports.postEditPictures = (req, res, next) => {
  const {id, pictureName, description} = req.body
  Picture.findById(id).then((editedPicture) => {
    editedPicture.pictureName = pictureName;
    editedPicture.description = description;
    if(req.file){
    fs.unlink(editedPicture.picture, (err)=>{
      if(err){
        console.log('while erro deleting file', err)
      }
    })
    editedPicture.picture = req.file.path
    }
    editedPicture.save().then((result)=>{
      console.log('Picture Updated', result)
    })
    .catch((err)=>{
      console.log('error ehile updating', err)
    })
    res.redirect('/host-picture-list')
  })
  .catch((err)=>{
    console.log('error while finding Picture', err)
  })
}

exports.postDeletePicture = (req, res, next) => {
  const pictureId = req.params.pictureId
  Picture.findByIdAndDelete(pictureId)
  .then(()=>{
    res.redirect('/host-picture-list')
  })
  .catch((err) => {
    console.log('error while deleting', err)
  })
}
