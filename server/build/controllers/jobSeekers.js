"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getBySSN = getBySSN;
exports.getByID = getByID;
exports.deleteJobSeeker = deleteJobSeeker;
exports.assignJobSeekerToJob = assignJobSeekerToJob;
exports.getJobSeekersByJobID = getJobSeekersByJobID;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var JobSeeker = require('mongoose').model('JobSeeker');

var Job = require('mongoose').model('Job');

var ObjectId = require('mongodb').ObjectID;

function create(req, res, next) {
  var errorMessage = [];

  if (!req.body.firstName) {
    errorMessage.push('First name is required');
  }

  if (!req.body.lastName) {
    errorMessage.push('Last name is required');
  }

  if (!req.body.ssn) {
    errorMessage.push('Social security number is required');
  } else if (req.body.ssn.toString().length != 9) {
    errorMessage.push('Social security numbers are 9 digits');
  }

  if (!req.body.birthday) {
    errorMessage.push('Birthday is required');
  }

  if (errorMessage.length != 0) {
    return res.status(400).json({
      error: errorMessage.join(' and ').toString()
    });
  }

  var jobSeeker = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    ssn: req.body.ssn,
    birthday: req.body.birthday
  };
  JobSeeker.create(jobSeeker, function (err, js) {
    if (err) {
      return next(err);
    } else return res.status(201).json({
      jobSeeker: js
    });
  });
}

function getAll(_, res, next) {
  JobSeeker.find().populate('currentJob').exec(function (err, jobSeeker) {
    if (err) return next(err);else return res.status(200).json({
      jobSeekers: jobSeeker
    });
  });
} // getBySSN


function getBySSN(req, res, next) {
  if (!req.query.SSN) {
    return res.status(400).json({
      message: 'SSN is required'
    });
  }

  if (req.query.SSN.length == 4) {
    JobSeeker.find({
      ssnString: req.query.SSN.toString()
    }, function (err, js) {
      if (err) next(err);else {
        res.status(200).json({
          jobSeekers: js
        });
      }
    });
  }
}

function getByID(req, res, next) {
  if (!req.params.id) {
    return res.status(404).json({
      message: 'ID is required'
    });
  }

  JobSeeker.findById(req.params.id).populate('currentJob').exec(function (err, jobSeeker) {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json({
        jobSeeker: jobSeeker
      });
    }
  });
}

function deleteJobSeeker(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'The ID of the Job Seeker to be deleted is required'
    });
  }

  JobSeeker.findOneAndDelete({
    _id: req.params.id
  }, function (err, deleted) {
    if (err) next(err);else {
      res.status(200).json({
        deleted: deleted
      });
    }
  });
}

function assignJobSeekerToJob(req, res, next) {
  if (!req.params.jobSeekerID) {
    return res.status(400).json({
      message: 'The ID of the Job Seeker to be assigned is required'
    });
  }

  if (!req.params.jobID) {
    return res.status(400).json({
      message: 'The ID of the Job to be assigned is required'
    });
  }

  JobSeeker.findById(req.params.jobSeekerID, function (err, js) {
    if (err) next(err);else {
      Job.findById(req.params.jobID, function (err, job) {
        if (err) next(err);else {
          var curJob = null;
          if (js.currentJob) curJob = js.currentJob;
          if (curJob) js.pastJobs = [].concat(_toConsumableArray(js.pastJobs), [curJob]);
          Object.assign(js, {
            currentJob: job
          });
          JobSeeker.update({
            _id: req.params.jobSeekerID
          }, js, function (err, newJS) {
            if (err) return next(err);else {
              return res.status(201).json({
                jobSeeker: newJS
              });
            }
          });
        }
      });
    }
  });
}

function getJobSeekersByJobID(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'The ID of the Job is required'
    });
  }

  JobSeeker.find({
    currentJob: req.params.id
  }, function (err, js) {
    if (err) return next(err);else {
      return res.status(200).json({
        jobSeekers: js
      });
    }
  });
}