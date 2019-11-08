"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.deleteById = deleteById;
exports.getAll = getAll;
exports.getByID = getByID;

var Job = require('mongoose').model('Job');

var Location = require('mongoose').model('Location');

function create(req, res, next) {
  if (req.body.name && req.body.peopleNeeded && req.body.address && req.body.transportationType && req.body.transportationCost) {
    var atl = Location.findOne({
      city: 'Atlanta'
    }, function (err, item) {
      var id = item['_id'];
      var job = {
        name: req.body.name,
        address: req.body.address,
        fssLocation: id,
        peopleNeeded: req.body.peopleNeeded,
        transportationType: req.body.transportationType,
        transportationCost: req.body.transportationCost
      };
      Job.create(job, function (err, j) {
        if (err) return next(err);
        return res.status(201).json({
          job: j
        });
      });
    });
  }
}

function deleteById(req, res, next) {
  Job.findByIdAndDelete(req.params.id, function (err, deleted) {
    if (err) return next(err);
    return res.status(200).json({
      deleted: deleted
    });
  });
}

function getAll(req, res, next) {
  Job.find({}, function (err, job) {
    if (err) return next(err);
    return res.status(200).json({
      jobs: job
    });
  }).populate('location');
}

function getByID(req, res, next) {
  if (!req.params.id) {
    return res.status(404).json({
      msg: 'id of the job is required'
    });
  }

  Job.findById(req.params.id, function (err, job) {
    if (err) {
      return next(err);
    }

    return res.status(200).json({
      job: job
    });
  });
}