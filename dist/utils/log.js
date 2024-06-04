"use strict";

var _log4js = _interopRequireDefault(require("log4js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_log4js["default"].configure({
  appenders: {
    backend: {
      type: 'file',
      filename: 'server.log'
    }
  },
  categories: {
    "default": {
      appenders: ['backend'],
      level: 'debug'
    }
  },
  pm2: true
});
var fileLogger = _log4js["default"].getLogger('backend');
function log(message) {
  console.log(message);
  fileLogger.debug(message);
}
module.exports = {
  log: log
};