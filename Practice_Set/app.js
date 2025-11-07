const path = require('path')

// External module
const express = require('express')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const DB_Path = "mongodb+srv://root:shivam123@shivamgupta.yettrq8.mongodb.net/airbnb?retryWrites=true&w=majority&appName=shivamgupta"


const app = express();

// Local module
const {storeRouter} = require('./routes/storeRouter')
const {hostRouter} = require('./routes/hostRouter')
const {authRouter} = require('./routes/authRouter')
const rootPath = require('./utils/utilPath')
const errorController = require('./controllers/errorController');
const { default: mongoose } = require('mongoose');



// EJS Function
app.set('view engine', 'ejs')
app.set('views', 'views')

// Session Store
const store = new mongoDBStore({
  uri: DB_Path,
  collection: 'sessions'
})

// middleware Function
app.use(express.urlencoded())

// this can be used for Session
app.use(session({
 secret: "shivam@543kumar",
 resave: false,
 saveUninitialized: true,
 store: store,
}));
app.use((req, res, next) => {
 req.isLoggedIn = req.session.isLoggedIn;
  next()
})


// Imports Routers
app.use(authRouter)
app.use(storeRouter)
app.use(hostRouter)

// app.use(" ", (req, res, next)=>{
//   if(req.IsLogedIn){
//     next()
//   }else{
//     res.redirect('/login')
//   }
// })


app.use(express.static(path.join(rootPath, 'public')))
app.use(errorController.getErrorHandler);

const port = 3006;

mongoose.connect(DB_Path).then(()=>{
  app.listen(port, ()=>{
    console.log(`Surver running at http://localhost:${port}`)
  })
}).catch(err =>{
  console.log('Error while connected to mongoose', err)
}) 

// mongodb://localhost:27017