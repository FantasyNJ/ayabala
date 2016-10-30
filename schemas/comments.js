var mongoose = require('mongoose');

var comments = new mongoose.Schema({
    comments: String,
    user: String,
    date: Date.now()
})

module.exports = comments;