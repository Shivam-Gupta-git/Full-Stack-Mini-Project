const{check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/modelUser')

exports.getLogin = (req, res, next)=>{
  res.render('auth/login', {
    PageTitle:'Login',
    currentPage:'Login',
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ''}
  })
} 
exports.postLogin = async (req, res, next)=>{
  console.log(req.body)
  const {email, userPassword} = req.body
  const user = await User.findOne({email: email})
  if(!user){
    return res.status(422).render('auth/login', {
      PageTitle:'Login',
      currentPage:'Login',
      isLoggedIn: false,
      errors: ["user does not exist"],
      oldInput: {email}
    })
  }

  const isMatch = await bcrypt.compare(userPassword, user.userPassword)
  if(!isMatch){
    return res.status(422).render('auth/login', {
      PageTitle:'Login',
      currentPage:'Login',
      isLoggedIn: false,
      errors: ["Invaled Password"],
      oldInput: {email}
    })
  }
  req.session.isLoggedIn = true
  req.session.user = user
  await req.session.save() 
  res.redirect('/')
}

exports.postLogOut = (req, res, next)=>{
  req.session.destroy(()=>{
    res.redirect('/login')
  })
}
exports.getSingUn = (req, res, next) => {
  res.render('auth/signup',{
    PageTitle: 'SignUp',
    currentPage: 'SignUp',
    isLoggedIn: req.isLoggedIn,
    errors: [],
    oldInput: {firstName: '', lastName: '', email: '', userPassword: '', userConfirmPassword: '', userType: ''}

  })
}
exports.postSignUp = [
  check('firstName')
  .trim()
  .isLength({min: 2})
  .withMessage('First Name should be at list two chracters long')
  .matches(/^[A-Za-z\s]*$/)
  .withMessage('First Name should contain only alphabets'),

  check('lastName')
  .matches(/^[A-Za-z\s]*$/)
  .withMessage('First Name should contain only alphabets'),

  check('email')
  .isEmail()
  .withMessage('Please enter a valid email')
  .normalizeEmail(),

  check('userPassword')
  .isLength({min: 8})
  .withMessage('Password should be atleast 8 chracters long')
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
    const {firstName, lastName, email, userPassword, userType} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
     return res.status(422).render('auth/signup',{
      PageTitle: 'SignUp',
      currentPage: 'SignUp',
      isLoggedIn: req.isLoggedIn,
      errors: errors.array().map(err => err.msg),
      oldInput: {firstName, lastName, email, userPassword, userType}
     })
    }

    bcrypt.hash(userPassword, 12)
    .then(hashedUserPassword => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPassword: hashedUserPassword,
        userType: userType
      })
      return user.save()
    })
    .then(()=>{
      res.redirect('/login')
    }).catch(err =>{
      return res.status(404).render('auth/signup',{
        PageTitle: 'SignUp',
        currentPage: 'SignUp',
        isLoggedIn: req.isLoggedIn,
        errors: [err.message],
        oldInput: {firstName, lastName, email, userPassword, userType}
       })
    })
}
]

// Shivam@123 password