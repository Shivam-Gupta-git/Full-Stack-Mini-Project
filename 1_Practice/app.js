// Core module
const path = require('path')

// External module
const express = require('express')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const DB_Path = ""

const app = express();

// Local module
const rootPath = require('./utils/utils-path');
const {userRouter} = require('./routes/user-router')
const {hostRouter} = require('./routes/host-router')
const {authRouter} = require('./routes/auth-router')
const { default: mongoose } = require('mongoose')

// EJS 
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware functionality.........
app.use(express.urlencoded());

// Session Store
const store = new mongoDBStore({
 uri: DB_Path,
 collection: 'sessions'
})

// session
app.use(session({
  secret: 'ram aam khata hai',
  resave: false,
  saveUninitialized: true,
  store: store
}))
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next()
})

// Imports
app.use("/user", userRouter);
app.use("/host", hostRouter);
app.use(authRouter)
app.use(express.static(path.join(rootPath, 'public')))

const port = 3000;
mongoose.connect(DB_Path).then(()=>{
  app.listen(port, ()=>{
    console.log(`surver running at http://localhost:${port}`)
  })
}).catch(err =>{
  console.log('Error while connenting database', err)
})