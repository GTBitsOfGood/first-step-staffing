const User = require('mongoose').model('User')

export function create(req, res, next) {
  if (!req.body.firstName) {
    return res.status(400).json({ message: 'First name is required' })
  }
  if (!req.body.lastName) {
    return res.status(400).json({ message: 'Last name is required' })
  }
  if (req.body?.ssn.toString().length != 9) {
    return res
      .status(400)
      .json({ message: 'Social security numbers are 9 digits' })
  } else if (!req.body.ssn) {
    return res
      .status(400)
      .json({ message: 'Social security number is required' })
  }
  if (!req.body.birthday) {
    return res.status(400).json({ message: 'Birthday is required' })
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    ssn: req.body.ssn,
    birthday: req.body.birthday
  }

  User.create(user, (err, usr) => {
    if (err) return next(err)
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
    const ssn = new RegExp(req.query.SSN)
    User.find({ ssn: req.query.SSN }, (err, users) => {
      if (err) next(err)
      else {
        res.status(200).json({ users: users })
      }
    })
  }
}
