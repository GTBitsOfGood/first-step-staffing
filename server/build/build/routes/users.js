"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = require("../controllers/users");

var router = (0, _express.Router)();
router.post('/', _users.create);
router.get('/', _users.getAll);
router.get('/first3LettersLastName', _users.getByLastName);
var _default = router;
exports.default = _default;