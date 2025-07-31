// Core module 
const path = require('path')

// External module 
const express = require('express')
const { default: mongoose } = require('mongoose')
const multer = require('multer')
const DB_Path = " "

const app = express()

// Local module
const rootPath = require('./utils/util-path')
const {userRouter} = require('./routes/user-router')
const {hostRouter} = require('./routes/host-router')

// EJS
app.set('view engine', 'ejs')
app.set('views', 'views')

// Generatr a random string
const randomString = (length) => {
  const character = 'abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for(let i = 0; i < length; i++){
    result += character.charAt(Math.floor(Math.random() * character.length))
  }
  return result
}

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'uploads/')
  },
  filename: (req, file, cd) => {
    cd(null, randomString(10) + '-' + file.originalname)
  }
}) 
const fileFilter = (req, file, cd) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cd(null, true)
  }else{
    cd(null, false)
  }
}

const multerOptions = {
  storage,
  fileFilter
}

// Middleware Function
app.use(express.urlencoded())
app.use(express.static(path.join(rootPath, 'public')))
app.use(multer(multerOptions).single('picture'))
app.use('/uploads', express.static(path.join(rootPath, 'uploads')))

// Imports Router
app.use(userRouter)
app.use(hostRouter)

const port = 3000;
mongoose.connect(DB_Path).then(()=>{
  app.listen(port, ()=>{
    console.log(`Surver running at http://localhost:${port}`)
  })
}).catch(err => {
  console.log('error while connecting mongodb')
})