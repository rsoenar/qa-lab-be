"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var StatisticSchema = new Schema({
  laboratoryTestReportCounterQa3100Sc: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3100Pc: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3100Kim: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3200Bc: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3200Mt: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3100ScYear: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3100PcYear: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3100KimYear: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3200BcYear: {
    type: Number,
    "default": 0
  },
  laboratoryTestReportCounterQa3200MtYear: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
StatisticSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
StatisticSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
StatisticSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = _mongoose["default"].model('statistics', StatisticSchema);
exports["default"] = _default;