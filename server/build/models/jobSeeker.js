"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jobSeekerSchema = new _mongoose.Schema({
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
    unique: true,
    validate: {
      validator: function validator(v) {
        return /\d{9}/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid Social Security Number!");
      }
    }
  },
  ssnString: {
    type: String,
    required: false,
    trim: true
  },
  birthday: {
    type: Date,
    required: true
  },
  currentJob: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  pastJobs: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: 'Job'
  }
});
jobSeekerSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(this.isModified('ssn') || this.isNew)) {
              _context.next = 4;
              break;
            }

            this.ssnString = this.ssn.toString().slice(-4);
            _context.next = 5;
            break;

          case 4:
            return _context.abrupt("return", next());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var JobSeeker = (0, _mongoose.model)('JobSeeker', jobSeekerSchema);
var _default = JobSeeker;
exports["default"] = _default;