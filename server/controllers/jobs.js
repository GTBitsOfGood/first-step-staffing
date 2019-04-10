const Job = require('mongoose').model('Job')
const Location = require('mongoose').model('Location')

export function create(req, res, next) {
  if (
    req.body.name &&
    req.body.peopleNeeded &&
    req.body.transportationType &&
    req.body.transportationCost
  ) {
    let id
    const atl = Location.findOne({ city: 'Atlanta' }, (err, item) => {
      id = item['_id']
      console.log(item)
      console.log(id)
      const job = {
        name: req.body.name,
        location: id,
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
    })
  }
}

export function deleteById(req, res, next) {
  Job.findByIdAndDelete(req.params.id, (err, deleted) => {
    if (err) return next(err)
    return res.status(200).json({ deleted: deleted })
  })
}

export function getAll(req, res, next) {
  Job.find({}, (err, job) => {
    if (err) return next(err)
    return res.status(200).json({
      jobs: job
    })
  }).populate('location')
}
