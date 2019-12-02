let mongoose = require('mongoose');
let dateSchema = new mongoose.Schema({
        date: String,
        jobLocations: [[String, Number]],
        transportations : [String]

})

module.exports = mongoose.model('dateSchema', dateSchema, "Dates")