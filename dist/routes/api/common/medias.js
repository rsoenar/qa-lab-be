"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Media = _interopRequireDefault(require("../../../models/common/Media"));
var _log = require("../../../utils/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
var _default = exports["default"] = function _default() {
  router.route('/all').get(function (_req, res) {
    _Media["default"].find().populate('uploader').then(function (medias) {
      return res.status(200).json({
        success: medias !== null && medias !== void 0 && medias.length ? true : false,
        message: null,
        data: {
          medias: medias
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  return router;
};