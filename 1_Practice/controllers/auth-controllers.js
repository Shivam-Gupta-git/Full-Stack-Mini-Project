const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

exports.getLogin = (req, res, next) => {
  res.render('auth/login',{
    PageTitle: 'Login',
    currentPage: 'Login',
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ''}
  })
}
exports.postLogin = async (req, res, next) => {
  console.log(req.body)
  const {email, userPassword} = req.body;
  const user = await User.findOne({email: email})
  if(!user){
    return res.status(422).render('auth/login',{
      PageTitle:'Login',
      currentPage:'Login',
      isLoggedIn: false,
      errors: ["user does not exist"],
      oldInput: {email}
    })
  }
  const isMatch = await bcrypt.compare(userPassword, user.userPassword)
  if(!isMatch){
    return res.status(422).render('auth/login',{
      PageTitle:'Login',
      currentPage:'Login',
      isLoggedIn: false,
      errors: ["user does not exist"],
      oldInput: {email}
    })
  }
  req.session.isLoggedIn = true
  req.session.user = user
  await req.session.save()
  res.redirect('user/home')
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect('/login')
  })
}

exports.getsignup = (req, res, next) => {
  res.render('auth/signup',{
    PageTitle: 'Signup',
    currentPage: 'Signup',
    isLoggedIn: req.isLoggedIn,
    errors: [],
    oldInput: {firstName: '', lastName: '', email: '', userPassword: '', userConfirmPassword: '', userType: ''}
  })
}

exports.postSignup = [
  check('firstName')
  .trim()
  .isLength({min: 2})
  .withMessage('First Name should be atleast two character long')
  .matches(/^[A-Za-z]*$/)
  .withMessage('First Name should be Contain only alphabets'),

  check('lastName')
  .matches(/^[A-Za-z]*$/)
  .withMessage('First Name Should be Contain only alphabets'),

  check('email')
  .isEmail()
  .withMessage('Please Enter a Valid Email')
  .normalizeEmail(),

  check('userPassword')
  .isLength({min: 5})
  .withMessage('Password should be Contain atleast 5 character long')
  .matches(/[A-Z]/)
  .withMessage('Password should be contain atleast one uppercase latter')
  .matches(/[a-z]/)
  .withMessage('Password should be contain atleast one lowercase latter')
  .matches(/[0-1]/)
  .withMessage('Password should contain atleast one number')
  .matches(/[!@&]/)
  .withMessage('Password should contain atlease one special character')
  .trim(),

  check('userConfirmPassword')
  .custom((value, {req})=>{
    if(value !== req.body.userPassword){
      throw new error('Password do not match')
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
  const {firstName, lastName, email, userPassword, userType } = req.body
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).render('auth/signup',{
      PageTitle: 'Signup',
      currentPage: 'Signup',
      isLoggedIn: req.isLoggedIn,
      errors: errors.array().map(err => err.msg),
      oldInput: {firstName, lastName, email, userPassword, userType}    
    })
   }

   bcrypt.hash(userPassword, 12)
   .then(hashUserPassword => {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userPassword: hashUserPassword,
      userType: userType
    })
    return user.save()
   }) 
   .then(()=>{
     res.redirect('/login')
   }).catch(err =>{
    return res.status(422).render('auth/signup',{
      PageTitle: 'Signup',
      currentPage: 'Signup',
      isLoggedIn: req.isLoggedIn,
      errors: [err.message],
      oldInput: {firstName, lastName, email, userPassword, userType}  
    })
   })
}
]