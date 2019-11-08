"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _equipment = require("../controllers/equipment");

var router = (0, _express.Router)();
router.post('/equipment', _equipment.create);
router["delete"]('/equipment/:id', _equipment.deleteById);
router.get('/', _equipment.getAll);
var _default = router;
exports["default"] = _default;