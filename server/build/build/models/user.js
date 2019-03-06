"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  firstName: String,
  lastName: String,
  ssn: Number,
  birthday: Date
});
var User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports.default = _default;