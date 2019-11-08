"use strict";

require("dotenv/config");

require("@babel/polyfill");

require("./models/db");

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _locations = _interopRequireDefault(require("./routes/locations"));

var _equipment = _interopRequireDefault(require("./routes/equipment"));

var _jobSeekers = _interopRequireDefault(require("./routes/jobSeekers"));

var _jobs = _interopRequireDefault(require("./routes/jobs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var path = ''; // this should be doable in webpack, this shouldn't have to be done here

if (process.env.NODE_ENV == 'production') {
  path += '../../';
} else {
  path += '../';
}

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _express["static"])((0, _path.join)(__dirname, path + 'client/build/')));
app.use('/', _index["default"]);
app.use('/locations', _locations["default"]);
app.use('/jobseekers', _jobSeekers["default"]);
app.use('/equipment', _equipment["default"]);
app.use('/jobs', _jobs["default"]);
app.get('/*', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, path + 'client/build/index.html'));
});
module.exports = app;