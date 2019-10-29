let mongoose = require('mongoose');


let employeeSchema = new mongoose.Schema({
    employee: {
        fname: String,
        lname: String,
        ssn: Boolean,
        date_of_birth: Date,
        EID: String,
        job_location: String,
        transportation: String,
    }
}, {collection: 'Employees'})

module.exports = mongoose.model('employeeSchema', employeeSchema)