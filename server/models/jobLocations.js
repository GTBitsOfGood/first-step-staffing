let mongoose = require('mongoose');


let jobLocationsSchema = new mongoose.Schema({
    jobLocations: [String],
    transportaion: [String]
})

module.exports = mongoose.model('jobLocations', jobLocationsSchema)