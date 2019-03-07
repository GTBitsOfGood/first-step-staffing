"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  ssn: {
    type: Number,
    required: true,
    validate: {
      validator: function validator(v) {
        return /\d{4}/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid Social Security Number!");
      }
    }
  },
  birthday: {
    type: Date,
    required: true
  }
});
var User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports.default = _default;