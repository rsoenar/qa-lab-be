"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _bcryptjs = require("bcryptjs");
var _User = _interopRequireDefault(require("../../../models/common/User"));
var _UserAuthorization = _interopRequireDefault(require("../../../models/common/UserAuthorization"));
var _auth = require("../../../utils/auth");
var _log = require("../../../utils/log");
var _excluded = ["_id", "__v", "username", "password", "newUser", "gender", "education", "major", "birthDate", "creationDate", "duty", "location"],
  _excluded2 = ["id"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var router = (0, _express.Router)();
var _default = exports["default"] = function _default(io) {
  router.route('/all').get(function (_req, res) {
    _User["default"].find().populate('authorization').lean().then(function (results) {
      var users;
      if (results.length) {
        users = results.map(function (user) {
          user.id = String(user._id);
          if (user.authorization) {
            var _user$authorization, _user$authorization2, _user$authorization3;
            user.authorization.id = String((_user$authorization = user.authorization) === null || _user$authorization === void 0 ? void 0 : _user$authorization._id);
            (_user$authorization2 = user.authorization) === null || _user$authorization2 === void 0 || delete _user$authorization2._id;
            (_user$authorization3 = user.authorization) === null || _user$authorization3 === void 0 || delete _user$authorization3.__v;
          }
          var _id = user._id,
            __v = user.__v,
            username = user.username,
            password = user.password,
            newUser = user.newUser,
            gender = user.gender,
            education = user.education,
            major = user.major,
            birthDate = user.birthDate,
            creationDate = user.creationDate,
            duty = user.duty,
            location = user.location,
            mappedUser = _objectWithoutProperties(user, _excluded);
          return mappedUser;
        }).sort(function (a, b) {
          return a.nik > b.nik ? 1 : b.nik > a.nik ? -1 : 0;
        });
      }
      return res.status(200).json({
        success: !!(results !== null && results !== void 0 && results.length),
        message: null,
        data: {
          users: users
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/register').post(function (req, res) {
    var _req$body = req === null || req === void 0 ? void 0 : req.body,
      nik = _req$body.nik,
      username = _req$body.username,
      password = _req$body.password;
    _User["default"].findOne({
      nik: nik
    }).lean().then(function (result) {
      if (result) {
        return res.status(200).json({
          success: false,
          message: 'NIK already registered. Contact the Administrator.',
          data: null
        });
      }
      return new _UserAuthorization["default"]({}).save().then(function (result) {
        return new _User["default"]({
          nik: nik,
          username: username,
          password: (0, _bcryptjs.hashSync)(password, 10),
          authorization: result === null || result === void 0 ? void 0 : result._id
        }).save();
      }).then(function (result) {
        if (result) {
          io.sockets.emit('users_updated');
        }
        return res.status(201).json({
          success: !!result,
          message: null,
          data: null
        });
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/login').post(function (req, res) {
    var _req$body2 = req === null || req === void 0 ? void 0 : req.body,
      username = _req$body2.username,
      password = _req$body2.password;
    _User["default"].findOne({
      username: username
    }).populate('authorization').then(function (result) {
      if (!result) {
        return res.status(200).json({
          success: false,
          message: "User doesn't exists.",
          data: null
        });
      }
      (0, _bcryptjs.compare)(password, result === null || result === void 0 ? void 0 : result.password).then(function (match) {
        if (match) {
          var token = (0, _auth.createUserToken)(result);
          return res.status(200).json({
            success: !!token,
            message: null,
            data: {
              token: "Bearer ".concat(token)
            }
          });
        }
        return res.status(200).json({
          success: false,
          message: 'Password incorrect',
          data: null
        });
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/refresh').post(function (req, res) {
    var _req$body3 = req === null || req === void 0 ? void 0 : req.body,
      id = _req$body3.id;
    _User["default"].findOne({
      _id: id
    }).populate('authorization').lean().then(function (result) {
      if (!result) {
        return res.status(200).json({
          success: false,
          message: "User ID doesn't exists.",
          data: null
        });
      }
      var token = (0, _auth.createUserToken)(result);
      return res.status(200).json({
        success: !!token,
        message: null,
        data: {
          token: "Bearer ".concat(token)
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/profile').patch(function (req, res) {
    var _req$body4 = req === null || req === void 0 ? void 0 : req.body,
      id = _req$body4.id,
      update = _objectWithoutProperties(_req$body4, _excluded2);
    _User["default"].findOneAndUpdate({
      _id: id
    }, update, {
      "new": true
    }).populate('authorization').then(function (result) {
      if (!result) {
        return res.status(200).json({
          success: false,
          message: "User ID doesn't exists.",
          data: null
        });
      }
      var token = (0, _auth.createUserToken)(result);
      io.sockets.emit('users_updated');
      return res.status(200).json({
        success: !!token,
        message: null,
        data: {
          token: "Bearer ".concat(token)
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/password').patch(function (req, res) {
    var _req$body5 = req === null || req === void 0 ? void 0 : req.body,
      id = _req$body5.id,
      password = _req$body5.password;
    _User["default"].findOneAndUpdate({
      _id: id
    }, {
      password: (0, _bcryptjs.hashSync)(password, 10)
    }, {
      "new": true
    }).populate('authorization').then(function (result) {
      var token = (0, _auth.createUserToken)(result);
      if (!result) {
        return res.status(200).json({
          success: false,
          message: "User ID doesn't exists.",
          data: null
        });
      }
      return res.status(200).json({
        success: !!token,
        message: null,
        data: {
          token: "Bearer ".concat(token)
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/logout').post(function (_req, res) {
    return res.status(200).json({
      success: true,
      message: null,
      data: null
    });
  });
  return router;
};