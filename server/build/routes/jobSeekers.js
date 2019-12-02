"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jobSeekers = require("../controllers/jobSeekers");

var router = (0, _express.Router)();
router["delete"]('/jobseeker/:id', _jobSeekers.deleteJobSeeker);
router.post('/jobseeker', _jobSeekers.create);
router.get('/', _jobSeekers.getAll);
router.get('/SSN', _jobSeekers.getBySSN);
router.get('/jobseeker/:id', _jobSeekers.getByID);
router.get('/jobseeker/:jobSeekerID/job/:jobID', _jobSeekers.assignJobSeekerToJob);
router.get('/job/:id', _jobSeekers.getJobSeekersByJobID);
var _default = router;
exports["default"] = _default;