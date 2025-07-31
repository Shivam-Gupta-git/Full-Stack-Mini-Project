const Picture = require('../models/Picture-model')
exports.getHomePage = (req, res, next) => {
  res.render('user/home',{
    PageTitle: 'Home Page',
    currentPage: 'Home Page'
  })
}
exports.getPicturesList = (req, res, next) => {
  Picture.find().then((addedPictures) => {
    res.render('user/picturesList', {
      PageTitle: 'Pictures List',
      currentPage: 'Pictures List',
      addedPictures: addedPictures
    })
  })
}