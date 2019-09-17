const Equipment = require('mongoose').model('Equipment')

export function create(req, res, next) {
  if (req.body.name && req.body.cost) {
    const equipment = {
      name: req.body.name,
      cost: req.body.cost
    }

    Equipment.create(equipment, (err, equip) => {
      if (err) return next(err)
      return res.status(201).json({
        equipment: equip
      })
    })
  } else if (!req.body.name && !req.body.cost) {
    return res
      .status(400)
      .json({ message: 'Equipment name and equipment cost is required' })
  } else if (!req.body.name) {
    return res.status(400).json({ message: 'Equipment name is required' })
  } else if (!req.body.cost) {
    return res.status(400).json({ message: 'Equipment cost is required' })
  }
}

export function deleteById(req, res, next) {
  if (!req.params.id)
    return res
      .status(400)
      .json({ message: 'equipment ID required for deletion' })
  Equipment.findByIdAndDelete(req.params.id, (err, tasks) => {
    if (err) return next(err)
    const response = {
      message: 'Equipment successfully deleted',
      id: req.params.id
    }
    return res.status(200).send(response)
  })
}

export function getAll(req, res, next) {
  Equipment.find({}, (err, equip) => {
    if (err) return next(err)
    return res.status(200).json({
      equipment: equip
    })
  })
}
