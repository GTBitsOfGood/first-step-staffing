const Job = require('mongoose').model('Job')
const Location = require('mongoose').model('Location')

export function create(req, res, next) {
  if (req.body.name && req.body.peopleNeeded && req.body.transportationType
      && req.body.transportationCost) {
    

    const job = {
      name: req.body.name,
      location: "5c61cb581ef33c0e3823897d",
      peopleNeeded: req.body.peopleNeeded,
      transportationType: req.body.transportationType,
      transportationCost: req.body.transportationCost
    }

    Job.create(job, (err, j) => {
      if (err) return next(err)
      return res.status(201).json({
        job: j
      })
    })
  }
}

export function getAll(req, res, next) {
  Job.find({}, (err, job) => {
    if (err) return next(err)
    return res.status(200).json({
      jobs: job
    })
  }).populate("location")
}
