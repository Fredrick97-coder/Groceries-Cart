const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

dotenv.config()

const app = express()

//Connection to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to DB server')
  })
  .catch((err) => {
    console.error(err)
  })

//middleware
app.use(express.json())

//routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

//Listening to server
app.listen(process.env.PORT || 3003, function () {
  console.log('Server listening on port: 3003')
})
