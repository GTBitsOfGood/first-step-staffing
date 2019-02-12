const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    ssn: Number,
    birthday: Date
}, { usePushEach: true })

let User = mongoose.model('User', userSchema)

module.exports = User
