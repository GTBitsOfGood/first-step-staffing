const User = require('mongoose').model('User')

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

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    ssn: req.body.ssn,
    birthday: req.body.birthday
  }

  User.create(user, (err, usr) => {
    if (err) {
      return next(err)
    }
    return res.status(201).json({
      user: usr
    })
  })
}

export function getAll(_, res, next) {
  User.find({}, (err, usr) => {
    if (err) return next(err)
    return res.status(200).json({
      users: usr
    })
  })
}

// getBySSN
export function getBySSN(req, res, next) {
  if (!req.query.SSN) {
    return res.status(400).json({ message: 'SSN is required' })
  }

  if (req.query.SSN.length == 4) {
    User.find({ ssnString: req.query.SSN.toString() }, (err, users) => {
      if (err) next(err)
      else {
        res.status(200).json({ users: users })
      }
    })
  }
}

export function deleteJobSeeker(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({ message: 'No id on delete' })
  }

  User.findOneAndDelete({ _id: req.params.id }, (err, deleted) => {
    if (err) next(err)
    else {
      res.status(200).json({ deleted: deleted })
    }
  })
}