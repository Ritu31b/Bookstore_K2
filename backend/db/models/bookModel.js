const mongoose = require('mongoose')

const Book = new mongoose.Schema({
    title: String,
    author: String,
    published: Number,
    category: String,
    price: Number,
    owner: String
})

module.exports = mongoose.model('Books', Book)