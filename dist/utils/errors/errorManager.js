"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _NotFoundError = _interopRequireDefault(require("./NotFoundError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function handleError(err, res) {
  var status = err.status,
    statusCode = err.statusCode,
    message = err.message;
  switch (err.constructor) {
    case _mongoose["default"].CastError || _mongoose["default"].DocumentNotFoundError:
      return res.status(404).json({
        status: 'fail',
        message: 'Data was not found'
      });
    default:
      res.status(statusCode !== null && statusCode !== void 0 ? statusCode : 500).json({
        status: status !== null && status !== void 0 ? status : 'error',
        message: message
      });
  }
}
module.exports = {
  NotFoundError: _NotFoundError["default"],
  handleError: handleError
};