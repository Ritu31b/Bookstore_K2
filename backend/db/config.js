const mongoose = require('mongoose')
const User = require('./models/userModel')
require('dotenv').config()

mongoose
  .connect(process.env.mongoURL)
  .then(() => {console.log("Connected to MongoDB");})
  .catch((err) => {console.log(err);})


// const data = {name: "Ram", role: "SDE-1", mobile: 12345}

// User.create(data)
//   .then(() => console.log("User created"))
//   .catch(e => console.log(e))