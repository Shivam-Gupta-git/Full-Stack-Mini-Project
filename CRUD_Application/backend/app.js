import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

const app = express();

// Local module
import connectDB from "./config/database.config.js";
import { contactRouter } from "./router/contact.router.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB({
  path: "./.env"
})

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/user', contactRouter)


app.get('/', (req, res) => {
  res.send('App Start');
})

app.listen(PORT, ()=> {
  console.log(`Surver Running at http://localhost:${PORT}`)
})