"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var JobSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    trim: true,
    upperCase: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    upperCase: true
  },
  fssLocation: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  peopleNeeded: {
    type: Number,
    required: true,
    trim: true
  },
  transportationType: {
    type: String,
    "enum": ['Van', 'Uber'],
    required: true,
    trim: true
  },
  transportationCost: {
    type: Number,
    required: true,
    trim: true
  }
});

var _default = (0, _mongoose.model)('Job', JobSchema);

exports["default"] = _default;