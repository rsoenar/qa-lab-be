"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _UserAuthorization = _interopRequireDefault(require("../../../models/common/UserAuthorization"));
var _log = require("../../../utils/log");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
var _default = function _default(io) {
  router.route('/:authorizationId').patch(function (req, res) {
    var params = req.params,
      body = req.body;
    _UserAuthorization["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.authorizationId
    }, body).then(function (result) {
      if ((result === null || result === void 0 ? void 0 : result.nModified) === 1) {
        io.sockets.emit('users_authorizations_updated');
      }
      return res.status(200).json({
        success: true,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  return router;
};
exports["default"] = _default;