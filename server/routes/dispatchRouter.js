var express = require('express')
var router = express.Router()
var employeeSchema = require('../models/employeeSchema')

router.get("/getEmployeesByJobs", (req, res) => {
    var allEmployees = "";
    employeeSchema.find({}, (err, info) =>{
        if(err) {
            res.status(500).send(err)
        } else {
            allEmployees = info;
        }
        var tbr = {}
        for (var i = 0; i < allEmployees.length; i++) {
            var currEmployee = allEmployees[i]
            var jobLocation = currEmployee.job_locations
            if (!(currEmployee.job_locations in tbr)) {
                tbr[jobLocation] = [];
            }
            tbr[jobLocation].push(currEmployee)
        }

        res.status(200).send(tbr)
        

    })
})

module.exports = router