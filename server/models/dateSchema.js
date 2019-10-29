let mongoose = require('mongoose');


let dateSchema = new mongoose.Schema({
    date: {
        jobLocations: [String],
        transportation: [String]
    }
}, {collection: 'Dates'})

module.exports = mongoose.model('dateSchema', dateSchema)