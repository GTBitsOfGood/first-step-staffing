const JobSeeker = require('mongoose').model('JobSeeker')

export function create(req, res, next) {
  let errorMessage = []
  if (!req.body.firstName) {
    errorMessage.push('First name is required')
  }
  if (!req.body.lastName) {
    errorMessage.push('Last name is required')
  }
  if (!req.body.ssn) {
    errorMessage.push('Social security number is required')
  } else if (req.body.ssn.toString().length != 9) {
    errorMessage.push('Social security numbers are 9 digits')
  }
  if (!req.body.birthday) {
    errorMessage.push('Birthday is required')
  }

  if (errorMessage.length != 0) {
    return res
      .status(400)
      .json({ error: errorMessage.join(' and ').toString() })
  }

  const jobSeeker = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    ssn: req.body.ssn,
    birthday: req.body.birthday
  }

  JobSeeker.create(jobSeeker, (err, js) => {
    if (err) {
      return next(err)
    }
    return res.status(201).json({
      jobSeeker: js
    })
  })
}

export function getAll(_, res, next) {
  JobSeeker.find({}, (err, jobSeeker) => {
    if (err) return next(err)
    return res.status(200).json({
      jobSeekers: jobSeeker
    })
  })
}

// getBySSN
export function getBySSN(req, res, next) {
  if (!req.query.SSN) {
    return res.status(400).json({ message: 'SSN is required' })
  }

  if (req.query.SSN.length == 4) {
    JobSeeker.find({ ssnString: req.query.SSN.toString() }, (err, js) => {
      if (err) next(err)
      else {
        res.status(200).json({ jobSeekers: js })
      }
    })
  }
}

export function deleteJobSeeker(req, res, next) {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: 'The ID of the Job Seeker to be deleted is required' })
  }

  JobSeeker.findOneAndDelete({ _id: req.params.id }, (err, deleted) => {
    if (err) next(err)
    else {
      res.status(200).json({ deleted: deleted })
    }
  })
}