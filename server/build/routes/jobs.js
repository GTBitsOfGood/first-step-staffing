"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jobs = require("../controllers/jobs");

var router = (0, _express.Router)();
router.post('/job', _jobs.create);
router["delete"]('/job/:id', _jobs.deleteById);
router.get('/', _jobs.getAll);
router.get('/job/:id', _jobs.getByID);
var _default = router;
exports["default"] = _default;