"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var EquipmentSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  }
});

var _default = (0, _mongoose.model)('Equipment', EquipmentSchema);

exports["default"] = _default;