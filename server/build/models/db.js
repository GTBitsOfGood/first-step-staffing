"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

require("./location");

require("./equipment");

require("./user");

(0, _mongoose.connect)(process.env.MONGO_URL, {
  useNewUrlParser: true
});
var db = _mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var _default = db;
exports.default = _default;