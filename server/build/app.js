"use strict";

require("dotenv/config");

require("./models/db");

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _locations = _interopRequireDefault(require("./routes/locations"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _express.static)((0, _path.join)(__dirname, '../client/build/')));
app.use('/', _index.default);
app.use('/locations', _locations.default);
app.use('/users', _users.default);
app.get('/*', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, '../client/build/index.html'));
});
module.exports = app;