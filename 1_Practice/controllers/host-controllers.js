exports.getAddItems = (req, res, next) => {
  res.render('host/addItems', {
    PageTitle: 'Add Items',
    currentPage: 'Add Items',
    isLoggedIn: req.isLoggedIn
  })
}