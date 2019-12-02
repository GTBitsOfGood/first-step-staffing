"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
/* GET home page. */

router.get('/', function (_, res) {
  res.send('this is an API route');
});
var _default = router;
exports["default"] = _default;