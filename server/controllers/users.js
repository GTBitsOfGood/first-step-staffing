const User = require('mongoose').model('User')

export function create(req, res, next) {
  if (req.body.firstName &&
    req.body.lastName &&
    req.body.ssn &&
    req.body.birthday) {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ssn: req.body.ssn,
        birthday: req.body.birthday,
      }

      User.create(user, (err, usr) => {
        if (err) return next(err)
        return res.status(201).json({
          user: usr
        })
      })
    }
}

export function getAll(_, res, next) {
  User.find({}, (err, usr) => {
    if (err) return next(err)
    return res.status(200).json({
      users: usr,
    })
  })
}

export function getByLastName(req, res, next) {
  if (req.query.first3.length == 3) {
    const first3 = new RegExp(req.query.first3, 'i')
    User.find({ lastName: { $regex: first3 }}, (err, users) => {
      if (err) next(err)
      else {
        res.status(200).json({ users: users })
      }
    })
  }
}
