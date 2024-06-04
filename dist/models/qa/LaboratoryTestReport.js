"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var LaboratoryTestReportSchema = new Schema({
  reportDate: {
    type: Date,
    "default": null
  },
  reportNumber: {
    type: String,
    trim: true,
    "default": ''
  },
  testResult: {
    type: String,
    "default": ''
  },
  testResultHtml: {
    type: String,
    "default": ''
  },
  reportAttachmentFileName: {
    type: String,
    "default": ''
  },
  reportAttachmentFileOriginalName: {
    type: String,
    "default": ''
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  },
  reportApproveDate: {
    type: Date,
    "default": null
  },
  reportApprover: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  }
});
LaboratoryTestReportSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
LaboratoryTestReportSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
LaboratoryTestReportSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = _mongoose["default"].model('qa.laboratory_test_reports', LaboratoryTestReportSchema);
exports["default"] = _default;