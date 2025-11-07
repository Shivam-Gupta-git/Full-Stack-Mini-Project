exports.getErrorHandler = (req, res, next)=>{
  res.status(404).render('Error404', {
    PageTitle:'Page not Found',
    currentPage:'404 Error',
    isLoggedIn: req.isLoggedIn
  })
}