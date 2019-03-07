"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getByLastName = getByLastName;

var User = require('mongoose').model('User');

function create(req, res, next) {
  if (req.body.firstName && req.body.lastName && req.body.ssn && req.body.birthday) {
    var user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ssn: req.body.ssn,
      birthday: req.body.birthday
    };
    User.create(user, function (err, usr) {
      if (err) return next(err);
      return res.status(201).json({
        user: usr
      });
    });
  }
}

function getAll(_, res, next) {
  User.find({}, function (err, usr) {
    if (err) return next(err);
    return res.status(200).json({
      users: usr
    });
  });
}

function getByLastName(req, res, next) {
  if (req.query.first3.length == 3) {
    var first3 = new RegExp(req.query.first3, 'i');
    User.find({
      lastName: {
        $regex: first3
      }
    }, function (err, users) {
      if (err) next(err);else {
        res.status(200).json({
          users: users
        });
      }
    });
  }
}