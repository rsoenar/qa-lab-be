"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var LaboratoryTestRequestSchema = new Schema({
  requestDate: {
    type: Date,
    "default": null
  },
  requestNumber: {
    type: String,
    trim: true,
    "default": ''
  },
  laboratory: {
    type: String,
    trim: true,
    "default": ''
  },
  organizationUnit: {
    type: String,
    trim: true,
    "default": ''
  },
  material: {
    type: String,
    "default": ''
  },
  type: {
    type: String,
    "default": ''
  },
  specification: {
    type: String,
    "default": ''
  },
  program: {
    type: String,
    trim: true,
    "default": ''
  },
  budgetNumber: {
    type: String,
    trim: true,
    "default": ''
  },
  reasonOfTest: {
    type: String,
    trim: true,
    "default": ''
  },
  manufacturer: {
    type: String,
    trim: true,
    "default": ''
  },
  manufacturingDate: {
    type: String,
    trim: true,
    "default": ''
  },
  expiryDate: {
    type: String,
    trim: true,
    "default": ''
  },
  batchNumber: {
    type: String,
    trim: true,
    "default": ''
  },
  sample: {
    type: String,
    trim: true,
    "default": ''
  },
  condition: {
    type: String,
    trim: true,
    "default": ''
  },
  unit: {
    type: String,
    trim: true,
    "default": ''
  },
  quantity: {
    type: String,
    trim: true,
    "default": ''
  },
  typeOfTest: {
    type: String,
    "default": ''
  },
  testAccordingToSpecification: {
    type: String,
    trim: true,
    "default": null
  },
  requestAttachmentFileName: {
    type: String,
    "default": ''
  },
  requestAttachmentFileOriginalName: {
    type: String,
    "default": ''
  },
  tempReportNumber: {
    type: String,
    trim: true,
    "default": ''
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  },
  requestApproveDate: {
    type: Date,
    "default": null
  },
  requestApprover: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  },
  requestReceiveDate: {
    type: Date,
    "default": null
  },
  estimationCloseDate: {
    type: Date,
    "default": null
  },
  requestReceiver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  }
});
LaboratoryTestRequestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
LaboratoryTestRequestSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
LaboratoryTestRequestSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = exports["default"] = _mongoose["default"].model('qa.laboratory_test_requests', LaboratoryTestRequestSchema);