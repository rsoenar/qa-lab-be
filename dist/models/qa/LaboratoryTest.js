"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var LaboratoryTestSchema = new Schema({
  qaLaboratoryTestRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'qa.laboratory_test_requests',
    "default": null
  }],
  qaLaboratoryTestReports: [{
    type: Schema.Types.ObjectId,
    ref: 'qa.laboratory_test_reports',
    "default": null
  }]
});
LaboratoryTestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
LaboratoryTestSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
LaboratoryTestSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = _mongoose["default"].model('qa.laboratory_tests', LaboratoryTestSchema);
exports["default"] = _default;