const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')
exports.getLogin = (req, res, next) => {
  res.render('auth/login',{
    PageTitle: 'Login',
    currentPage: 'Login',
    isLoggedIn: false,
    error: [],
    email: {email: ''}
  })
}
exports.postLogin = async (req, res, next) => {
  console.log(req.body)
  const {email, userPassword} = req.body
  const user = await User.findOne({email: email})
  if(!user){
    return res.status(422).render('auth/login', {
      PageTitle: 'Login',
      currentPage: 'Login',
      isLoggedIn: false,
      error: ['user does not exist'],
      oldInput: {email}
    })
  }
  const isMatch = await bcrypt.compare(userPassword, user.userPassword)
  if(!isMatch){
    return res.status(422).render('auth/login',{
      PageTitle: 'Login',
      currentPage: 'Login',
      isLoggedIn: false,
      error: ['user does not exist'],
      oldInput: {email}
    })
  }
 req.session.isLoggedIn = true
 req.session.user = user
 await req.session.save()
  res.redirect('/user/home')
}
exports.postLogout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect('login')
  })
}
exports.getSignup = (req, res, next) => {
  res.render('auth/signup',{
    PageTitle: 'SignUp',
    currentPage: 'Signup',
    isLoggedIn: req.isLoggedIn,
    error: [],
    oldInput: {firstName: '', lastName: '', email: '', userPassword: '', userType: ''}
  })
}
exports.postSignup = [
  check('firstName')
  .trim()
  .isLength({min: 2})
  .withMessage('First Name should be two character long')
  .matches(/^[A-Za-z]*$/)
  .withMessage('First Name should be contain only alphabet'),

  check('lastName')
  .matches(/^[A-Za-z]*$/)
  .withMessage('First Name Should be Contain only alphabets'),

  check('email')
  .isEmail()
  .withMessage('Please Enter a Valid Email')
  .normalizeEmail(),

  check('userPassword')
  .isLength({mai: 5})
  .withMessage('User Password should contain at least 5 character')
  .matches(/[A-Z]/)
  .withMessage('Password should be contain atleast one uppercase latter')
  .matches(/[a-z]/)
  .withMessage('Password should be contain atleast one lowercase latter')
  .matches(/[0-1]/)
  .withMessage('Password should contain atleast one number')
  .trim(),

  check('userConfirmPassword')
  .custom((value, {req}) => {
    if(value !== req.body.userPassword){
      throw new console.error('Password do not match');
    }
    return true
  }),

  check('userType')
  .notEmpty()
  .withMessage('Please select a user type')
  .isIn(['guest', 'host'])
  .withMessage('Invaled user type'),

  check('terms')
  .notEmpty()
  .custom((value, {req})=>{
    if(value !== 'on'){
      throw new error('Please accept the terms and condition')
    }
    return true
  }),

  (req, res, next) => {
  console.log(req.body)
  const {firstName, lastName, email, userPassword , userType} = req.body
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(422).render('auth/signup', {
      PageTitle: 'SignUp',
      currentPage: 'Signup',
      isLoggedIn: req.isLoggedIn, 
      error : error.array().map(err => err.msg),
      oldInput: {
        firstName, 
        lastName, 
        email,
        userPassword, 
        userType
      }
    })
  }
  bcrypt.hash(userPassword, 12).then(hashUserPassword => {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userPassword: hashUserPassword,
      userType: userType
    })
  return user.save()
  }).then(()=>{
    res.redirect('login')
  }).catch(err => {
    return res.status(422).render('auth/signup',{
      PageTitle: 'SignUp',
      currentPage: 'Signup',
      isLoggedIn: req.isLoggedIn, 
      error: [err.message],
      oldInput: {firstName, lastName, email, userPassword, userType}
    })
  })
}
]