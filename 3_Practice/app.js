//  Core module
const path = require('path')

// External module
const express = require('express');
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const { default: mongoose } = require('mongoose');
const multer = require('multer')
const dataBase = "mongodb+srv://root:shivam123@shivamgupta.yettrq8.mongodb.net/practice_3?retryWrites=true&w=majority&appName=shivamgupta"

const app = express()

//  Local module
const rootPath = require('./utils/util-path')
const {userRouter} = require('./routes/user-router') 
const {hostRouter} = require('./routes/host-router')
const {authRouter} = require('./routes/auth-router')

// EJS
app.set('view engine', 'ejs')
app.set('views', 'views')

// Generate Random String
const randomString = (length)=>{
const character = 'abcdefghijklmnopqrstuvwxyz'
let result = ''
for(let i = 0; i < length; i++){
  result += character.charAt(Math.floor(Math.random() *  character.length))
}
return result;
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
// MiddleWare
app.use(express.urlencoded())
app.use(express.static(path.join(rootPath, 'public')))
app.use(multer(multerOptions).single('picture'))
app.use('/user/uploads', express.static(path.join(rootPath, 'uploads')))

// Session Store
const store = new mongoDBStore({
  uri: dataBase,
  collection: 'sessions'
})

// Session
app.use(session({
  secret: 'shivam321123',
  resave: false,
  saveUninitialized: true,
  store: store
}))
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next()
})

app.use("/user", userRouter)
app.use("/host", hostRouter)
app.use(authRouter)


const port = 3000;
mongoose.connect(dataBase).then(()=>{
  app.listen(port,  ()=>{
    console.log(`Surver running at http://localhost:${port}`)
})
}).catch(err => {
  console.log('erreo while connecting data base', err)
})
