const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')

const Port=8000
const router = require('./routes/adminR')
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieparser())
app.use(router)

app.listen(Port,console.log('App is Running......'))
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Yaswanth:yaswanth123@cluster0.vra8mzr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));
  