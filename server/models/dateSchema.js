let mongoose = require('mongoose');
var date = require('./date')
let dateSchema = new mongoose.Schema({
    date: {
        "jobLocations": [[String, Number]],
        "transportation": [String]
    }
})

module.exports = mongoose.model('dateSchema', dateSchema, "Dates")