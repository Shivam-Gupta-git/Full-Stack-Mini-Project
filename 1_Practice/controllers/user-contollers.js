exports.getHomePage = (req, res, next)=>{
res.render('user/home',{
  PageTitle: 'Home Page',
  currentPage: 'Home Page',
  isLoggedIn: req.isLoggedIn
})
}