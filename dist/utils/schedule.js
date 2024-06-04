"use strict";

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _child_process = require("child_process");
var _log = require("./log");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function scheduleMongoDbBackup() {
  _nodeSchedule["default"].scheduleJob('00 23 * * *', function () {
    var dailyBackup = (0, _child_process.spawn)('mongodump', ['--db=iae_server', '--gzip', '-o', 'public/backup/mongodb/iae_server_daily']);
    dailyBackup.on('exit', function (code, signal) {
      if (code) {
        (0, _log.log)("Daily backup process exited with code ".concat(code));
      } else if (signal) {
        (0, _log.log)("Daily backup process was killed with signal ".concat(signal));
      } else {
        (0, _log.log)('Daily backup success');
      }
    });
  });
  _nodeSchedule["default"].scheduleJob('10 23 * * 0', function () {
    var weeklyBackup = (0, _child_process.spawn)('mongodump', ['--db=iae_server', '--gzip', '-o', 'public/backup/mongodb/iae_server_weekly']);
    weeklyBackup.on('exit', function (code, signal) {
      if (code) {
        (0, _log.log)("Weekly backup process exited with code ".concat(code));
      } else if (signal) {
        (0, _log.log)("Weekly backup process was killed with signal ".concat(signal));
      } else {
        (0, _log.log)('Weekly backup success');
      }
    });
  });
  _nodeSchedule["default"].scheduleJob('20 23 1 * *', function () {
    var monthlyBackup = (0, _child_process.spawn)('mongodump', ['--db=iae_server', '--gzip', '-o', 'public/backup/mongodb/iae_server_monthly_' + String(new Date().getMonth() + 1).padStart(2, '0') + String(new Date().getFullYear())]);
    monthlyBackup.on('exit', function (code, signal) {
      if (code) {
        (0, _log.log)("Monthly backup process exited with code ".concat(code));
      } else if (signal) {
        (0, _log.log)("Monthly backup process was killed with signal ".concat(signal));
      } else {
        (0, _log.log)('Monthly backup success');
      }
    });
  });
  _nodeSchedule["default"].scheduleJob('30 23 1 1 *', function () {
    var annualBackup = (0, _child_process.spawn)('mongodump', ['--db=iae_server', '--gzip', '-o', 'public/backup/mongodb/iae_server_annual_' + String(new Date().getFullYear())]);
    annualBackup.on('exit', function (code, signal) {
      if (code) {
        (0, _log.log)("Annual backup process exited with code ".concat(code));
      } else if (signal) {
        (0, _log.log)("Annual backup process was killed with signal ".concat(signal));
      } else {
        (0, _log.log)('Annual backup success');
      }
    });
  });
}
module.exports = {
  scheduleMongoDbBackup: scheduleMongoDbBackup
};