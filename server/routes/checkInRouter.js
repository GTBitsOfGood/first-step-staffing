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
    dateSchema.find({date: date}, (err, info) => {

        if (err) {
            res.status(500).send(err)
        } else if (!info) {
            res.status(404).send("Could not find this date!!!!")
        }
        var foundObj = info[0]
        var toBeReturned = {
            jobLocations: foundObj.jobLocations,
            transportations: foundObj.transportations
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
router.post("/createDate", (req, res) => {
    var objToSave = req.body;
    let newDate = new dateSchema({
        date: objToSave.date,
        jobLocations: objToSave.jobLocations,
        transportations: objToSave.transportations
    })
    newDate.save(function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(newDate.toJSON())
        }
    })
})
module.exports = router