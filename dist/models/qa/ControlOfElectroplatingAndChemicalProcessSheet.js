"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Schemas
var Schema = _mongoose["default"].Schema;
var SurfaceTreatmentSchema = new Schema({
  operationSequence: {
    type: String,
    "default": undefined
  },
  tankNumber: {
    type: String,
    "default": undefined
  },
  temperatureInCelciusNominal: {
    type: String,
    "default": undefined
  },
  temperatureInCelciusActual: {
    type: String,
    "default": undefined
  },
  voltageNominal: {
    type: String,
    "default": undefined
  },
  voltageActual: {
    type: String,
    "default": undefined
  },
  currentDensityNominal: {
    type: String,
    "default": undefined
  },
  currentDensityActual: {
    type: String,
    "default": undefined
  },
  ampereActual: {
    type: String,
    "default": undefined
  },
  passOrFail: {
    type: String,
    "default": undefined
  },
  timeInMinuteNominal: {
    type: String,
    "default": undefined
  },
  timeInMinuteActual: {
    type: String,
    "default": undefined
  }
}, {
  timestamps: true
});
var TestingSchema = new Schema({
  materialAndCondition: {
    type: String,
    "default": undefined
  },
  dimensionInMilimeter: {
    type: String,
    "default": undefined
  },
  quantity: {
    type: String,
    "default": undefined
  },
  typeOfTest: {
    type: String,
    "default": undefined
  },
  resultNominals: {
    type: [String],
    "default": undefined
  },
  resultActuals: {
    type: [String],
    "default": undefined
  },
  resultActualAverage: {
    type: String,
    "default": undefined
  },
  testMethods: {
    type: [String],
    "default": undefined
  }
}, {
  timestamps: true
});
var CorrosionResistanceTestSchema = new Schema({
  materialAndCondition: {
    type: String,
    "default": undefined
  },
  dimensionInMilimeter: {
    type: String,
    "default": undefined
  },
  quantity: {
    type: String,
    "default": undefined
  },
  codes: {
    type: [String],
    "default": undefined
  },
  angleOfSpecification: {
    type: String,
    "default": undefined
  },
  saltCabinets: {
    type: [String],
    "default": undefined
  },
  supporting: {
    type: String,
    "default": undefined
  },
  durationTimeInHour: {
    type: String,
    "default": undefined
  },
  startDate: {
    type: Date,
    "default": undefined
  },
  finishDate: {
    type: Date,
    "default": undefined
  },
  beforeSaltSprayTestingCleaning: {
    type: String,
    "default": undefined
  },
  beforeSaltSprayTestingResults: {
    type: [String],
    "default": undefined
  },
  afterSaltSprayTestingCleaning: {
    type: String,
    "default": undefined
  },
  afterSaltSprayTestingResults: {
    type: [String],
    "default": undefined
  },
  passOrFail: {
    type: String,
    "default": undefined
  },
  note: {
    type: String,
    "default": undefined
  }
}, {
  timestamps: true
});
var ControlOfElectroplatingAndChemicalProcessSheetSchema = new Schema({
  sheetNumber: {
    type: String,
    "default": undefined
  },
  process: {
    type: String,
    "default": undefined
  },
  program: {
    type: String,
    "default": undefined
  },
  specification: {
    type: String,
    "default": undefined
  },
  attachmentFileName: {
    type: String,
    "default": undefined
  },
  attachmentFileOriginalName: {
    type: String,
    "default": undefined
  },
  operatorSignedDate: {
    type: Date,
    "default": undefined
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  inspectorSignedDate: {
    type: Date,
    "default": undefined
  },
  inspector: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  laboratoriumPersonnelSignedDate: {
    type: Date,
    "default": undefined
  },
  laboratoriumPersonnel: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  beforeSaltSprayTestingLaboratoriumPersonnelSignedDate: {
    type: Date,
    "default": undefined
  },
  beforeSaltSprayTestingLaboratoriumPersonnel: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  afterSaltSprayTestingLaboratoriumPersonnelSignedDate: {
    type: Date,
    "default": undefined
  },
  afterSaltSprayTestingLaboratoriumPersonnel: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  verificatorSignedDate: {
    type: Date,
    "default": undefined
  },
  verificator: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": undefined
  },
  testingNoteInHtml: {
    type: String,
    "default": undefined
  },
  finalDecision: {
    type: String,
    "default": undefined
  },
  validUntilDate: {
    type: Date,
    "default": undefined
  },
  surfaceTreatments: {
    type: [SurfaceTreatmentSchema],
    "default": undefined
  },
  testings: {
    type: [TestingSchema],
    "default": undefined
  },
  corrosionResistanceTest: {
    type: CorrosionResistanceTestSchema,
    "default": undefined
  }
}, {
  timestamps: true
});

// Virtuals
SurfaceTreatmentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
SurfaceTreatmentSchema.virtual('createdAtMs').get(function () {
  var _this$createdAt;
  return (_this$createdAt = this.createdAt) === null || _this$createdAt === void 0 ? void 0 : _this$createdAt.getTime();
});
SurfaceTreatmentSchema.virtual('updatedAtMs').get(function () {
  var _this$updatedAt;
  return (_this$updatedAt = this.updatedAt) === null || _this$updatedAt === void 0 ? void 0 : _this$updatedAt.getTime();
});
TestingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
TestingSchema.virtual('createdAtMs').get(function () {
  var _this$createdAt2;
  return (_this$createdAt2 = this.createdAt) === null || _this$createdAt2 === void 0 ? void 0 : _this$createdAt2.getTime();
});
TestingSchema.virtual('updatedAtMs').get(function () {
  var _this$updatedAt2;
  return (_this$updatedAt2 = this.updatedAt) === null || _this$updatedAt2 === void 0 ? void 0 : _this$updatedAt2.getTime();
});
CorrosionResistanceTestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
CorrosionResistanceTestSchema.virtual('createdAtMs').get(function () {
  var _this$createdAt3;
  return (_this$createdAt3 = this.createdAt) === null || _this$createdAt3 === void 0 ? void 0 : _this$createdAt3.getTime();
});
CorrosionResistanceTestSchema.virtual('updatedAtMs').get(function () {
  var _this$updatedAt3;
  return (_this$updatedAt3 = this.updatedAt) === null || _this$updatedAt3 === void 0 ? void 0 : _this$updatedAt3.getTime();
});
CorrosionResistanceTestSchema.virtual('startDateMs').get(function () {
  var _this$startDate;
  return (_this$startDate = this.startDate) === null || _this$startDate === void 0 ? void 0 : _this$startDate.getTime();
});
CorrosionResistanceTestSchema.virtual('finishDateMs').get(function () {
  var _this$finishDate;
  return (_this$finishDate = this.finishDate) === null || _this$finishDate === void 0 ? void 0 : _this$finishDate.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('createdAtMs').get(function () {
  var _this$createdAt4;
  return (_this$createdAt4 = this.createdAt) === null || _this$createdAt4 === void 0 ? void 0 : _this$createdAt4.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('updatedAtMs').get(function () {
  var _this$updatedAt4;
  return (_this$updatedAt4 = this.updatedAt) === null || _this$updatedAt4 === void 0 ? void 0 : _this$updatedAt4.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('operatorSignedDateMs').get(function () {
  var _this$operatorSignedD;
  return (_this$operatorSignedD = this.operatorSignedDate) === null || _this$operatorSignedD === void 0 ? void 0 : _this$operatorSignedD.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('inspectorSignedDateMs').get(function () {
  var _this$inspectorSigned;
  return (_this$inspectorSigned = this.inspectorSignedDate) === null || _this$inspectorSigned === void 0 ? void 0 : _this$inspectorSigned.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('laboratoriumPersonnelSignedDateMs').get(function () {
  var _this$laboratoriumPer;
  return (_this$laboratoriumPer = this.laboratoriumPersonnelSignedDate) === null || _this$laboratoriumPer === void 0 ? void 0 : _this$laboratoriumPer.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('beforeSaltSprayTestingLaboratoriumPersonnelSignedDateMs').get(function () {
  var _this$beforeSaltSpray;
  return (_this$beforeSaltSpray = this.beforeSaltSprayTestingLaboratoriumPersonnelSignedDate) === null || _this$beforeSaltSpray === void 0 ? void 0 : _this$beforeSaltSpray.getTime();
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('afterSaltSprayTestingLaboratoriumPersonnelSignedDateMs').get(function () {
  var _this$afterSaltSprayT;
  return (_this$afterSaltSprayT = this.afterSaltSprayTestingLaboratoriumPersonnelSignedDate) === null || _this$afterSaltSprayT === void 0 ? void 0 : _this$afterSaltSprayT.getTime();
});

// Setters
SurfaceTreatmentSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
SurfaceTreatmentSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
TestingSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
TestingSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
CorrosionResistanceTestSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
CorrosionResistanceTestSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
ControlOfElectroplatingAndChemicalProcessSheetSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = _mongoose["default"].model('qa.control_of_electroplating_and_chemical_process_sheets', ControlOfElectroplatingAndChemicalProcessSheetSchema);
exports["default"] = _default;