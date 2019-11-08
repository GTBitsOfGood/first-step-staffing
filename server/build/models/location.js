"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

// TODO: Add zipcode?
var LocationSchema = (0, _mongoose.Schema)({
  streetNumber: {
    type: Number,
    required: true,
    trim: true
  },
  streetName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  // consider converting to enum??
  state: {
    type: String,
    required: true,
    trim: true
  }
});

var _default = (0, _mongoose.model)('Location', LocationSchema);

exports["default"] = _default;