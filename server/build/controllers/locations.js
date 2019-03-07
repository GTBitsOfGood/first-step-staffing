"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;

var Location = require('mongoose').model('Location');

function create(req, res, next) {
  if (req.body.streetNumber && req.body.streetName && req.body.city && req.body.state) {
    var location = {
      streetNumber: req.body.streetNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      state: req.body.state
    };
    Location.create(location, function (err, loc) {
      if (err) return next(err);
      return res.status(201).json({
        location: loc
      });
    });
  }
}

function getAll(req, res, next) {
  Location.find({}, function (err, loc) {
    if (err) return next(err);
    return res.status(200).json({
      locations: loc
    });
  });
}