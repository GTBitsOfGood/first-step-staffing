let mongoose = require('mongoose');


let jobLocationsSchema = new mongoose.Schema({
    jobLocation: {
        locationName: [String],
        employees: [String],
    }
}, {collection: 'Locations'})

module.exports = mongoose.model('jobLocations', jobLocationsSchema)