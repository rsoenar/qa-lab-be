"use strict";

var _multer = _interopRequireDefault(require("multer"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Mail transporter
var iaeMailTransporter = _nodemailer["default"].createTransport({
  host: 'mail.indonesian-aerospace.com',
  port: 465,
  secure: true,
  auth: {
    user: 'arfajar',
    pass: '12345678'
  }
});

// QA storages
var laboratoryTestStorage = _multer["default"].diskStorage({
  destination: function destination(_req, _file, cb) {
    cb(null, './public/uploads/qaLaboratoryTests');
  },
  filename: function filename(_req, file, cb) {
    cb(null, "".concat((0, _uuid.v4)(), "-").concat(Date.now()).concat(_path["default"].extname(file.originalname)));
  }
});
var chemicalSolutionControlStorage = _multer["default"].diskStorage({
  destination: function destination(_req, _file, cb) {
    cb(null, './public/uploads/qaChemicalSolutionControls');
  },
  filename: function filename(_req, file, cb) {
    cb(null, "".concat((0, _uuid.v4)(), "-").concat(Date.now()).concat(_path["default"].extname(file.originalname)));
  }
});
var electroplatingChemicalProcessControlStorage = _multer["default"].diskStorage({
  destination: function destination(_req, _file, cb) {
    cb(null, './public/uploads/qa/electroplating-chemical-process-controls');
  },
  filename: function filename(_req, file, cb) {
    cb(null, "".concat((0, _uuid.v4)(), "-").concat(Date.now()).concat(_path["default"].extname(file.originalname)));
  }
});

// QA uploads
var laboratoryTestUpload = (0, _multer["default"])({
  storage: laboratoryTestStorage
});
var chemicalSolutionControlUpload = (0, _multer["default"])({
  storage: chemicalSolutionControlStorage
});
var electroplatingChemicalProcessControlUpload = (0, _multer["default"])({
  storage: electroplatingChemicalProcessControlStorage
});
module.exports = {
  mailTransporter: iaeMailTransporter,
  laboratoryTestUpload: laboratoryTestUpload,
  chemicalSolutionControlUpload: chemicalSolutionControlUpload,
  electroplatingChemicalProcessControlUpload: electroplatingChemicalProcessControlUpload
};