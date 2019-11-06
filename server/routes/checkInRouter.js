var express = require('express')
var router = express.Router()
var dateSchema = require("../models/dateSchema");
var employeeSchema = require('../models/employeeSchema')
var mongoose = require('mongoose')
console.log('here')
// GET jobLocations and transportation lists
router.get("/date/:date", (req, res) => {
    //GET jobLocations and transporation list by the date
    // res.send(" route")
    const date = req.params.date;
    console.log(date)
    dateSchema.find({}, (err, info) => {
        if (err) {
            res.status(500).send(err)
        } else if (!info) {
            res.status(404).send("Could not find this date!!!!")
        }
        var foundObj = {}
        for (var i in info){
            for (var j in info[i].toJSON()){
                console.log(j)
                if (j == date) {
                    foundObj = info[i].toJSON();
                    break;
                }
            }
            
        }
        var toBeReturned = {
            jobLocations: foundObj[date].jobLocations,
            transportations: foundObj[date].transportation
        }
        res.status(200).send(toBeReturned)
    })
    
})

router.post("/checkin", (req, res) => {
    const employeeInfo = req.body;
    var EID = employeeInfo.firstName + employeeInfo.lastName + employeeInfo.date_of_birth;
    var JB = employeeInfo.jobLocation;
    console.log(employeeInfo.signature)


    var newCheckIn = new employeeSchema({
            fname: employeeInfo.firstName,
            lname: employeeInfo.lastName,
            ssn: employeeInfo.ssn,
            date_of_birth: employeeInfo.date_of_birth,
            EID: EID,
            job_locations:employeeInfo.jobLocation,
            transportation: employeeInfo.transportation,
            signature: employeeInfo.signature
    })

    newCheckIn.save().then(res.status(200).send("done"))

})
module.exports = router