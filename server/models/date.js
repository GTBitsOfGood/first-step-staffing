let mongoose = require('mongoose');

let date = new mongoose.Schema({
    date: String
})

module.exports = mongoose.model("date", date);