"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.deleteById = deleteById;
exports.getAll = getAll;

var Equipment = require('mongoose').model('Equipment');

function create(req, res, next) {
  if (req.body.name && req.body.cost) {
    var equipment = {
      name: req.body.name,
      cost: req.body.cost
    };
    Equipment.create(equipment, function (err, equip) {
      if (err) return next(err);
      return res.status(201).json({
        equipment: equip
      });
    });
  } else if (!req.body.name && !req.body.cost) {
    return res.status(400).json({
      message: 'Equipment name and equipment cost is required'
    });
  } else if (!req.body.name) {
    return res.status(400).json({
      message: 'Equipment name is required'
    });
  } else if (!req.body.cost) {
    return res.status(400).json({
      message: 'Equipment cost is required'
    });
  }
}

function deleteById(req, res, next) {
  if (!req.params.id) return res.status(400).json({
    message: 'equipment ID required for deletion'
  });
  Equipment.findByIdAndDelete(req.params.id, function (err, tasks) {
    if (err) return next(err);
    var response = {
      message: 'Equipment successfully deleted',
      id: req.params.id
    };
    return res.status(200).send(response);
  });
}

function getAll(req, res, next) {
  Equipment.find({}, function (err, equip) {
    if (err) return next(err);
    return res.status(200).json({
      equipment: equip
    });
  });
}