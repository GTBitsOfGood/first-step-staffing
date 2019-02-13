const Location = require('mongoose').model('Location')

export function create(req, res, next) {
  if (req.body.streetNumber &&
    req.body.streetName &&
    req.body.city &&
    req.body.state) {
    const location = {
      streetNumber: req.body.streetNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      state: req.body.state
    }

    Location.create(location, (err, loc) => {
      if (err) return next(err)
      return res.status(201).json({
        location: loc
      })
    })
  }
}

export function getAll(req, res, next) {
  Location.find({}, (err, loc) => {
    if (err) return next(err)
    return res.status(200).json({
      locations: loc
    })
  })
}