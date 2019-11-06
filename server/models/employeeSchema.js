let mongoose = require('mongoose');


let employeeSchema = new mongoose.Schema({
        fname: String,
        lname: String,
        ssn: String,
        date_of_birth: String,
        EID: String,
        job_locations: String,
        transportation: String,
        signature: String
    
}, {collection: 'Employees'})

module.exports = mongoose.model('employeeSchema', employeeSchema)