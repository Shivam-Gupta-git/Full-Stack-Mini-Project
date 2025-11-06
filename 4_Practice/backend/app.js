// Core module
const path = require('path')

// External module
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const dataBase = "mongodb+srv://root:shivam123@shivamgupta.yettrq8.mongodb.net/todo?retryWrites=true&w=majority&appName=shivamgupta"

// Local module
const {todoItemsRouter} = require('./routes/todoItems-router')
const rootPath = require('./utils/util-path')

const app = express()

// Middleware Function
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.use(todoItemsRouter)

const port = 3000;
mongoose.connect(dataBase).then(()=>{
  app.listen(port, ()=>{
    console.log(`Surver running at http://localhost:${port}`)
})
}).catch(err =>{
  console.log('error while connecting dataBase', err)
})