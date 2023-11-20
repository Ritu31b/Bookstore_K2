const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./db/models/userModel')
const Book = require('./db/models/bookModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('./db/config')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port=process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.post('/register', async (req,res) => {
  let user = await User.findOne(req.body)
  if(!user){
    User.create(req.body)
    .then((result) => {
      jwt.sign({result}, process.env.jwtKey, {expiresIn: "2h"}, (err,token) => {
        if(err) {
          res.send("Error in JWT signing")
        }

      res.status(200).send({user:{name: result.name, email: result.email, userID: result._id}, token})
      })
    })
    .catch(e => console.log(e))
  } else {
    res.status(400).send('User already exist')
  }
  
})



app.post('/login', async (req,res) => {
  let user = await User.findOne(req.body)
  if(user) {
    // res.status(200).send({name: user.name, email: user.email, userID: user._id});
    jwt.sign({user}, process.env.jwtKey, {expiresIn: "2h"}, (err,token) => {
      if(err) {
        res.send("Error in JWT signing")
      }
      res.status(200).send({user:{name: user.name, email: user.email, userID: user._id}, token})
    })
  }else {
    res.status(400).send("User not found")
  }
})



app.post('/add', verifyToken, (req,res) => {
  Book.create(req.body)
    .then(() => res.send('Book added to DB'))
    .catch(e => console.log(e))
})



app.get('/books', verifyToken, async (req,res) => {
  let bookArr = await Book.find()
  res.send(bookArr)
  // if(bookArr.length > 0) {
  //   res.send(bookArr)
  // } else{
  //   res.send('No Books found')
  // }
})



app.get('/books/:id', verifyToken, async (req,res) => {
  let result = await Book.findOne({_id: req.params.id})
  if(result) {
    res.send(result)
  } else{
    res.send({result: 'No book found'})
  }
})



app.delete('/books/:id', verifyToken, (req,res) => {
  Book.deleteOne({_id: req.params.id})
    .then(result => res.send(result))
    .catch(e => console.log(e))
})



app.put('/books/:id', verifyToken, (req,res) => {
  Book.updateOne({_id: req.params.id}, {$set: req.body})
  .then((result => res.send(result)))
  .catch(e => console.log(e))
})



app.get('/books/search/:key', verifyToken, (req,res) => {
  Book.find({
    $or:[
      {title: {$regex: req.params.key}},
      {author: {$regex: req.params.key}},
      {category: {$regex: req.params.key}}
    ]
  })
    .then((result) => {
      if(result) {
        res.send(result)
      }else {
        res.send('No match found')
      }
    
    })
    .catch(e => console.log(e))
})



function verifyToken(req, res, next){
  let token = req.headers['authorization'];
  if(token) {
    jwt.verify(token, process.env.jwtKey, (err,valid) => {
      if(err){
        res.send({message : "Provide a valid token"})
      } else {
        next();
      }
    })
  } else {
    res.send({message : "Provide a token in headers"})
  }
}