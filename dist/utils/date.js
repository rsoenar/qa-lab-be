"use strict";

var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var today = new Date();
var dd = parseInt(String(today.getDate()).padStart(2, '0'));
var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
var yyyy = today.getFullYear();
var jakartaToday = new Date().setHours(today.getHours() + 7);
var jakartaDate = function jakartaDate(date) {
  if (date instanceof Date) {
    return date.setHours(today.getHours() + 7);
  }
  return null;
};
var formatDateDmmyyyy = function formatDateDmmyyyy(date) {
  if (date instanceof Date) {
    return _moment["default"].utc(date).local().format('D MMMM YYYY');
  }
  return null;
};
var isValidYear = function isValidYear(year) {
  if (isNaN(Number(year))) {
    return false;
  }
  return year.length === 4;
};
module.exports = {
  today: today,
  dd: dd,
  mm: mm,
  yyyy: yyyy,
  jakartaToday: jakartaToday,
  jakartaDate: jakartaDate,
  formatDateDmmyyyy: formatDateDmmyyyy,
  isValidYear: isValidYear
};