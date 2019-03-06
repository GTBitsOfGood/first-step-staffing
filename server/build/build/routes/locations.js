"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _locations = require("../controllers/locations");

var router = (0, _express.Router)();
router.post('/location', _locations.create);
router.get('/', _locations.getAll);
var _default = router;
exports.default = _default;