"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _fs = _interopRequireDefault(require("fs"));
var _moment = _interopRequireDefault(require("moment"));
var _nodeHtmlToImage = _interopRequireDefault(require("node-html-to-image"));
var _path = _interopRequireDefault(require("path"));
var _express = require("express");
var _LaboratoryTest = _interopRequireDefault(require("../../../models/qa/LaboratoryTest"));
var _LaboratoryTestReport = _interopRequireDefault(require("../../../models/qa/LaboratoryTestReport"));
var _LaboratoryTestRequest = _interopRequireDefault(require("../../../models/qa/LaboratoryTestRequest"));
var _Statistic = _interopRequireDefault(require("../../../models/common/Statistic"));
var _date = require("../../../utils/date");
var _io = require("../../../utils/io");
var _log = require("../../../utils/log");
var _excel = require("../../../utils/excel");
var _url = require("../../../constants/url");
var _excluded = ["reporter", "reportApprover"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
// polyfills required by exceljs
require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');
var ExcelJS = require('exceljs/dist/es5');
var router = (0, _express.Router)();
var _default = exports["default"] = function _default(io) {
  var logoImage = _path["default"].join(__dirname, '../../../../public/assets/img', 'iae-logo.png');
  var generateQaLaboratoryTestRequestPdf = function generateQaLaboratoryTestRequestPdf(id) {
    return new Promise(function (resolve) {
      _LaboratoryTestRequest["default"].findById(id).populate('requester').populate('requestApprover').then(function (qaLaboratoryTestRequest) {
        if (qaLaboratoryTestRequest) {
          var _requester$name, _requester$nik, _requestApprover$name, _requestApprover$nik;
          var _id = qaLaboratoryTestRequest._id,
            requestDate = qaLaboratoryTestRequest.requestDate,
            requester = qaLaboratoryTestRequest.requester,
            requestNumber = qaLaboratoryTestRequest.requestNumber,
            laboratory = qaLaboratoryTestRequest.laboratory,
            material = qaLaboratoryTestRequest.material,
            type = qaLaboratoryTestRequest.type,
            specification = qaLaboratoryTestRequest.specification,
            program = qaLaboratoryTestRequest.program,
            budgetNumber = qaLaboratoryTestRequest.budgetNumber,
            reasonOfTest = qaLaboratoryTestRequest.reasonOfTest,
            manufacturer = qaLaboratoryTestRequest.manufacturer,
            manufacturingDate = qaLaboratoryTestRequest.manufacturingDate,
            expiryDate = qaLaboratoryTestRequest.expiryDate,
            batchNumber = qaLaboratoryTestRequest.batchNumber,
            sample = qaLaboratoryTestRequest.sample,
            condition = qaLaboratoryTestRequest.condition,
            unit = qaLaboratoryTestRequest.unit,
            quantity = qaLaboratoryTestRequest.quantity,
            typeOfTest = qaLaboratoryTestRequest.typeOfTest,
            testAccordingToSpecification = qaLaboratoryTestRequest.testAccordingToSpecification,
            requestApprover = qaLaboratoryTestRequest.requestApprover;
          var typeOfTests = typeOfTest === null || typeOfTest === void 0 ? void 0 : typeOfTest.split(', ');
          var writeStream = _fs["default"].createWriteStream("./public/temp/QA Laboratory Test Request ".concat(_id, ".pdf"));
          var doc = new _pdfkit["default"]({
            size: 'FOLIO',
            margins: {
              top: 30,
              left: 40,
              right: 30
            }
          });
          doc.image(logoImage, 60, 35, {
            width: 65
          }).fillColor('#E0E0E0').lineWidth(1).moveTo(40, 30).lineTo(40, 896).lineTo(582, 896).lineTo(582, 30).lineTo(40, 30).moveTo(40, 100).lineTo(582, 100).moveTo(140, 30).lineTo(140, 100).moveTo(482, 30).lineTo(482, 100).stroke().fillColor('#E0E0E0').lineWidth(0.5).moveTo(205, 130).lineTo(562, 130).moveTo(205, 150).lineTo(562, 150).moveTo(205, 190).lineTo(562, 190).moveTo(205, 210).lineTo(562, 210).moveTo(205, 230).lineTo(562, 230).moveTo(205, 250).lineTo(562, 250).moveTo(205, 270).lineTo(562, 270).moveTo(205, 290).lineTo(562, 290).moveTo(205, 310).lineTo(562, 310).moveTo(205, 330).lineTo(562, 330).moveTo(205, 350).lineTo(562, 350).moveTo(205, 370).lineTo(562, 370).moveTo(205, 390).lineTo(562, 390).moveTo(205, 410).lineTo(562, 410).moveTo(205, 430).lineTo(562, 430).moveTo(205, 450).lineTo(562, 450).moveTo(205, 470).lineTo(562, 470).moveTo(205, 490).lineTo(562, 490).stroke().fillColor('#E0E0E0').lineWidth(1).moveTo(60, 165).lineTo(562, 165).moveTo(60, 505).lineTo(562, 505).moveTo(60, 805).lineTo(562, 805).stroke().moveDown(1.6).fillColor('#424242').font('Helvetica-Bold').fontSize(16).text('REQUEST FOR LABORATORY TEST', {
            align: 'center'
          }).fontSize(12).text('QUALITY ASSURANCE LABORATORY', {
            align: 'center'
          }).text('NUMBER', 500, 55, {
            characterSpacing: 2
          }).font('Helvetica').fontSize(10).text('Request for Laboratory', 60, 120).text('Date of Request', 60, 140).text('Material', 60, 180).text('Type / Model / Code', 60, 200).text('Material Specification', 60, 260).text('Manufactured by', 60, 280).text('Batch / Roll Number', 60, 300).text('Manufacturing Date', 60, 320).text('Expired Date', 60, 340).text('Program', 60, 360).text('Budget / RV / JID No.', 60, 380).text('Condition', 60, 400).text('Unit', 60, 420).text('Quantity of Sample', 60, 440).text('Quantity of Material', 60, 460).text('Reason of Test', 60, 480).text('Type of Test :', 60, 520, {
            underline: true
          }).text('Test According to Specification :', 60, 760, {
            underline: true
          }).fontSize(7).text('F-DP 704.04.01', 60, 900).text('This document is generated by the system, retention record valid in system, no re-validation is required. Uncontrollable document after printing.', 125, 900).fillColor('#424242').font('Helvetica-Bold').fontSize(10).text('Requested By', 60, 820, {
            align: 'center',
            width: 231,
            underline: true
          }).text('Checked & Approved By', 291, 820, {
            align: 'center',
            width: 231,
            underline: true
          }).font('Helvetica').fontSize(8).text("".concat(requestNumber !== null && requestNumber !== void 0 ? requestNumber : ''), 481, 70, {
            align: 'center',
            underline: true,
            width: 100
          }).font('Helvetica').fontSize(10).text(": ".concat(laboratory !== null && laboratory !== void 0 ? laboratory : ''), 200, 120).text(": ".concat(requestDate ? _moment["default"].utc(requestDate).local().format('ddd, D MMMM YYYY') : ''), 200, 140).text(":", 200, 180).text("".concat(material !== null && material !== void 0 ? material : ''), 205, 180).text(":", 200, 200).text("".concat(type.replace(/ {2,}/g, ' ')), 205, 200, {
            lineGap: 8,
            width: 365
          }).text(":", 200, 260).text("".concat(specification !== null && specification !== void 0 ? specification : ''), 205, 260).text(":", 200, 280).text("".concat(manufacturer !== null && manufacturer !== void 0 ? manufacturer : ''), 205, 280).text(":", 200, 300).text("".concat(batchNumber !== null && batchNumber !== void 0 ? batchNumber : ''), 205, 300).text(":", 200, 320).text("".concat(manufacturingDate !== null && manufacturingDate !== void 0 ? manufacturingDate : ''), 205, 320).text(":", 200, 340).text("".concat(expiryDate !== null && expiryDate !== void 0 ? expiryDate : ''), 205, 340).text(":", 200, 360).text("".concat(program !== null && program !== void 0 ? program : ''), 205, 360).text(":", 200, 380).text("".concat(budgetNumber !== null && budgetNumber !== void 0 ? budgetNumber : ''), 205, 380).text(":", 200, 400).text("".concat(condition !== null && condition !== void 0 ? condition : ''), 205, 400).text(":", 200, 420).text("".concat(unit !== null && unit !== void 0 ? unit : ''), 205, 420).text(":", 200, 440).text("".concat(sample !== null && sample !== void 0 ? sample : ''), 205, 440).text(":", 200, 460).text("".concat(quantity !== null && quantity !== void 0 ? quantity : ''), 205, 460).text(":", 200, 480).text("".concat(reasonOfTest !== null && reasonOfTest !== void 0 ? reasonOfTest : ''), 205, 480).text("".concat(testAccordingToSpecification !== null && testAccordingToSpecification !== void 0 ? testAccordingToSpecification : ''), 80, 780).text("".concat((_requester$name = requester === null || requester === void 0 ? void 0 : requester.name) !== null && _requester$name !== void 0 ? _requester$name : ''), 60, 866, {
            align: 'center',
            width: 231,
            underline: true
          }).text("".concat((_requester$nik = requester === null || requester === void 0 ? void 0 : requester.nik) !== null && _requester$nik !== void 0 ? _requester$nik : ''), 60, 876, {
            align: 'center',
            width: 231
          }).text("".concat((_requestApprover$name = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.name) !== null && _requestApprover$name !== void 0 ? _requestApprover$name : ''), 291, 866, {
            align: 'center',
            width: 231,
            underline: true
          }).text("".concat((_requestApprover$nik = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.nik) !== null && _requestApprover$nik !== void 0 ? _requestApprover$nik : ''), 291, 876, {
            align: 'center',
            width: 231
          });
          if ((typeOfTests === null || typeOfTests === void 0 ? void 0 : typeOfTests.length) > 10) {
            var typeOfTests1 = typeOfTests === null || typeOfTests === void 0 ? void 0 : typeOfTests.slice(0, 10);
            doc.list(typeOfTests1 === null || typeOfTests1 === void 0 ? void 0 : typeOfTests1.map(function (i) {
              return i === null || i === void 0 ? void 0 : i.trim();
            }), 80, 540, {
              lineGap: 10,
              height: 300
            });
            var typeOfTests2 = typeOfTests === null || typeOfTests === void 0 ? void 0 : typeOfTests.slice(10);
            doc.list(typeOfTests2 === null || typeOfTests2 === void 0 ? void 0 : typeOfTests2.map(function (i) {
              return i === null || i === void 0 ? void 0 : i.trim();
            }), 331, 540, {
              lineGap: 10,
              height: 300
            });
          } else if ((typeOfTests === null || typeOfTests === void 0 ? void 0 : typeOfTests.length) <= 10) {
            doc.list(typeOfTests === null || typeOfTests === void 0 ? void 0 : typeOfTests.map(function (i) {
              return i === null || i === void 0 ? void 0 : i.trim();
            }), 80, 540, {
              lineGap: 10,
              height: 300
            });
          }
          doc.end();
          doc.pipe(writeStream);
          writeStream.on('finish', function () {
            return resolve();
          });
        }
      });
    });
  };
  var generateQaLaboratoryTestReportPdf = function generateQaLaboratoryTestReportPdf(qaLaboratoryTestId, id) {
    return new Promise(function (resolve) {
      _LaboratoryTest["default"].findById(qaLaboratoryTestId).then(function (qaLaboratoryTest) {
        var _qaLaboratoryTest$qaL;
        _LaboratoryTestRequest["default"].findById(qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests[(qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL = qaLaboratoryTest.qaLaboratoryTestRequests) === null || _qaLaboratoryTest$qaL === void 0 ? void 0 : _qaLaboratoryTest$qaL.length) - 1]).populate('requester').populate('requestApprover').then(function (qaLaboratoryTestRequest) {
          var _qaLaboratoryTest$qaL2;
          _LaboratoryTestReport["default"].findById(id !== null && id !== void 0 ? id : qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestReports[(qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL2 = qaLaboratoryTest.qaLaboratoryTestReports) === null || _qaLaboratoryTest$qaL2 === void 0 ? void 0 : _qaLaboratoryTest$qaL2.length) - 1]).populate('reporter').populate('reportApprover').then(function (qaLaboratoryTestReport) {
            var _qaLaboratoryTestRepo, _qaLaboratoryTestRepo2;
            var reporterSignature = _path["default"].join(__dirname, '../../../../public/assets/img/user/signature', "".concat(qaLaboratoryTestReport === null || qaLaboratoryTestReport === void 0 || (_qaLaboratoryTestRepo = qaLaboratoryTestReport.reporter) === null || _qaLaboratoryTestRepo === void 0 ? void 0 : _qaLaboratoryTestRepo.nik, ".jpg"));
            var reportApproverSignature = _path["default"].join(__dirname, '../../../../public/assets/img/user/signature', "".concat(qaLaboratoryTestReport === null || qaLaboratoryTestReport === void 0 || (_qaLaboratoryTestRepo2 = qaLaboratoryTestReport.reportApprover) === null || _qaLaboratoryTestRepo2 === void 0 ? void 0 : _qaLaboratoryTestRepo2.nik, ".jpg"));
            if (qaLaboratoryTestRequest && qaLaboratoryTestReport) {
              var requestDate = qaLaboratoryTestRequest.requestDate,
                requestNumber = qaLaboratoryTestRequest.requestNumber,
                material = qaLaboratoryTestRequest.material,
                type = qaLaboratoryTestRequest.type,
                specification = qaLaboratoryTestRequest.specification,
                program = qaLaboratoryTestRequest.program,
                budgetNumber = qaLaboratoryTestRequest.budgetNumber,
                manufacturer = qaLaboratoryTestRequest.manufacturer,
                manufacturingDate = qaLaboratoryTestRequest.manufacturingDate,
                expiryDate = qaLaboratoryTestRequest.expiryDate,
                batchNumber = qaLaboratoryTestRequest.batchNumber,
                typeOfTest = qaLaboratoryTestRequest.typeOfTest;
              var _id = qaLaboratoryTestReport._id,
                reportDate = qaLaboratoryTestReport.reportDate,
                reportNumber = qaLaboratoryTestReport.reportNumber,
                testResultHtml = qaLaboratoryTestReport.testResultHtml,
                reporter = qaLaboratoryTestReport.reporter,
                reportApprover = qaLaboratoryTestReport.reportApprover;
              var writeStream = _fs["default"].createWriteStream("./public/temp/QA Laboratory Test Report ".concat(_id, ".pdf"));
              var doc = new _pdfkit["default"]({
                size: 'FOLIO',
                margins: {
                  top: 30,
                  left: 40,
                  right: 30
                }
              });
              (0, _nodeHtmlToImage["default"])({
                output: "./public/temp/QA Laboratory Test Result ".concat(_id, ".png"),
                quality: 100,
                html: "<html>\n                    <head>\n                      <style>\n                      body {\n                        font-family: 'Helvetica', 'Arial', sans-serif;\n                        width: 920px;\n                      }\n                      </style>\n                    </head>\n                    <body>".concat(testResultHtml, "</body>\n                    </html>\n                    ")
              }).then(function () {
                var testResultImage = _path["default"].join(__dirname, '../../../../public/temp', "QA Laboratory Test Result ".concat(_id, ".png"));
                return testResultImage;
              }).then(function (testResultImage) {
                var _reporter$name, _reporter$nik, _reportApprover$name, _reportApprover$nik;
                doc.image(logoImage, 60, 35, {
                  width: 65
                }).fillColor('#E0E0E0').lineWidth(1).moveTo(40, 30).lineTo(40, 896).lineTo(582, 896).lineTo(582, 30).lineTo(40, 30).moveTo(40, 100).lineTo(582, 100).moveTo(140, 30).lineTo(140, 100).moveTo(482, 30).lineTo(482, 100).stroke().fillColor('#E0E0E0').lineWidth(0.5).moveTo(205, 130).lineTo(562, 130).moveTo(205, 150).lineTo(321, 150).moveTo(446, 150).lineTo(562, 150).moveTo(205, 190).lineTo(562, 190).moveTo(205, 210).lineTo(562, 210).moveTo(205, 230).lineTo(562, 230).moveTo(205, 250).lineTo(562, 250).moveTo(205, 270).lineTo(562, 270).moveTo(205, 290).lineTo(562, 290).moveTo(205, 310).lineTo(562, 310).moveTo(205, 330).lineTo(562, 330).moveTo(205, 350).lineTo(562, 350).moveTo(205, 370).lineTo(562, 370).moveTo(205, 390).lineTo(562, 390).moveTo(205, 410).lineTo(562, 410).moveTo(205, 430).lineTo(562, 430).moveTo(205, 450).lineTo(562, 450).stroke().fillColor('#E0E0E0').lineWidth(1).moveTo(60, 165).lineTo(562, 165).moveTo(60, 465).lineTo(562, 465).moveTo(60, 805).lineTo(562, 805).stroke().moveDown(1.6).fillColor('#424242').font('Helvetica-Bold').fontSize(16).text('REPORT OF LABORATORY TEST', {
                  align: 'center'
                }).fontSize(12).text('QUALITY ASSURANCE LABORATORY', {
                  align: 'center'
                }).text('NUMBER', 500, 55, {
                  characterSpacing: 2
                }).font('Helvetica').fontSize(10).text('Test According to Request No.', 60, 120).text('Date of Report', 60, 140).text('Date of Request', 331, 140).text('Material', 60, 180).text('Type / Model / Code', 60, 200).text('Material Specification', 60, 260).text('Manufactured by', 60, 280).text('Batch / Roll Number', 60, 300).text('Manufacturing Date', 60, 320).text('Expired Date', 60, 340).text('Program', 60, 360).text('Budget / RV / JID No.', 60, 380).text('Type of Test', 60, 400).text('Description of Test Result :', 60, 480, {
                  underline: true
                }).fontSize(7).text('F-DP 704.04.02', 60, 900).text('This document is generated by the system, retention record valid in system, no re-validation is required. Uncontrollable document after printing.', 125, 900).fillColor('#424242').font('Helvetica-Bold').fontSize(10).text('Reported By', 60, 820, {
                  align: 'center',
                  width: 231,
                  underline: true
                }).text('Checked & Approved by', 291, 820, {
                  align: 'center',
                  width: 231,
                  underline: true
                }).font('Helvetica').fontSize(8).text("".concat(reportNumber !== null && reportNumber !== void 0 ? reportNumber : ''), 481, 70, {
                  align: 'center',
                  underline: true,
                  width: 100
                }).font('Helvetica').fontSize(10).text(": ".concat(requestNumber !== null && requestNumber !== void 0 ? requestNumber : ''), 200, 120).text(": ".concat(reportDate ? _moment["default"].utc(reportDate).local().format('ddd, D MMMM YYYY') : ''), 200, 140).text(": ".concat(requestDate ? _moment["default"].utc(requestDate).local().format('ddd, D MMMM YYYY') : ''), 441, 140).text(":", 200, 180).text("".concat(material !== null && material !== void 0 ? material : ''), 205, 180).text(":", 200, 200).text("".concat(type.replace(/ {2,}/g, ' ')), 205, 200, {
                  lineGap: 8,
                  width: 365
                }).text(":", 200, 260).text("".concat(specification !== null && specification !== void 0 ? specification : ''), 205, 260).text(":", 200, 280).text("".concat(manufacturer !== null && manufacturer !== void 0 ? manufacturer : ''), 205, 280).text(":", 200, 300).text("".concat(batchNumber !== null && batchNumber !== void 0 ? batchNumber : ''), 205, 300).text(":", 200, 320).text("".concat(manufacturingDate !== null && manufacturingDate !== void 0 ? manufacturingDate : ''), 205, 320).text(":", 200, 340).text("".concat(expiryDate !== null && expiryDate !== void 0 ? expiryDate : ''), 205, 340).text(":", 200, 360).text("".concat(program !== null && program !== void 0 ? program : ''), 205, 360).text(":", 200, 380).text("".concat(budgetNumber !== null && budgetNumber !== void 0 ? budgetNumber : ''), 205, 380).text(':', 200, 400).text("".concat(typeOfTest.replace(/ {2,}/g, ' ')), 205, 400, {
                  lineGap: 8,
                  width: 365
                }).text("".concat((_reporter$name = reporter === null || reporter === void 0 ? void 0 : reporter.name) !== null && _reporter$name !== void 0 ? _reporter$name : ''), 60, 866, {
                  align: 'center',
                  width: 231,
                  underline: true
                }).text("".concat((_reporter$nik = reporter === null || reporter === void 0 ? void 0 : reporter.nik) !== null && _reporter$nik !== void 0 ? _reporter$nik : ''), 60, 876, {
                  align: 'center',
                  width: 231
                }).text("".concat((_reportApprover$name = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.name) !== null && _reportApprover$name !== void 0 ? _reportApprover$name : ''), 291, 866, {
                  align: 'center',
                  width: 231,
                  underline: true
                }).text("".concat((_reportApprover$nik = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.nik) !== null && _reportApprover$nik !== void 0 ? _reportApprover$nik : ''), 291, 876, {
                  align: 'center',
                  width: 231
                }).image(testResultImage, 80, 500, {
                  fit: [482, 300],
                  align: 'left',
                  valign: 'center'
                });
                if (qaLaboratoryTestReport !== null && qaLaboratoryTestReport !== void 0 && qaLaboratoryTestReport.reporter && _fs["default"].existsSync(reporterSignature)) {
                  doc.image(reporterSignature, 60, 830, {
                    fit: [231, 35],
                    align: 'center',
                    valign: 'center'
                  });
                }
                if (qaLaboratoryTestReport !== null && qaLaboratoryTestReport !== void 0 && qaLaboratoryTestReport.reportApprover && _fs["default"].existsSync(reportApproverSignature)) {
                  doc.image(reportApproverSignature, 291, 830, {
                    fit: [231, 35],
                    align: 'center',
                    valign: 'center'
                  });
                }
                doc.end();
                doc.pipe(writeStream);
                writeStream.on('finish', function () {
                  return resolve();
                });
              });
            }
          });
        });
      });
    });
  };
  router.route('/all').get(function (_req, res) {
    var qaLaboratoryTests = [];
    _LaboratoryTest["default"].find().populate({
      path: 'qaLaboratoryTestRequests',
      model: 'qa.laboratory_test_requests',
      populate: [{
        path: 'requester',
        model: 'users'
      }, {
        path: 'requestApprover',
        model: 'users'
      }, {
        path: 'requestReceiver',
        model: 'users'
      }]
    }).populate({
      path: 'qaLaboratoryTestReports',
      model: 'qa.laboratory_test_reports',
      populate: [{
        path: 'reporter',
        model: 'users'
      }, {
        path: 'reportApprover',
        model: 'users'
      }]
    }).lean().then(function (results) {
      for (var i = 0; i < results.length; i++) {
        var _requester$organizati, _requester$organizati2, _requester$name2, _requester$nik2, _requester$organizati3, _requestApprover$name2, _requestApprover$nik2, _requestReceiver$name, _reporter$name2, _reporter$nik2, _reportApprover$name2, _reportApprover$nik2;
        var qaLaboratoryTest = results[i];
        var qaLaboratoryTestRequests = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests;
        var qaLaboratoryTestReports = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestReports;
        var qaLaboratoryTestRequest = qaLaboratoryTestRequests[(qaLaboratoryTestRequests === null || qaLaboratoryTestRequests === void 0 ? void 0 : qaLaboratoryTestRequests.length) - 1];
        var qaLaboratoryTestReport = qaLaboratoryTestReports[(qaLaboratoryTestReports === null || qaLaboratoryTestReports === void 0 ? void 0 : qaLaboratoryTestReports.length) - 1];
        var _ref = qaLaboratoryTestRequest !== null && qaLaboratoryTestRequest !== void 0 ? qaLaboratoryTestRequest : {},
          requestDate = _ref.requestDate,
          requestNumber = _ref.requestNumber,
          laboratory = _ref.laboratory,
          organizationUnit = _ref.organizationUnit,
          material = _ref.material,
          type = _ref.type,
          specification = _ref.specification,
          program = _ref.program,
          budgetNumber = _ref.budgetNumber,
          reasonOfTest = _ref.reasonOfTest,
          manufacturer = _ref.manufacturer,
          manufacturingDate = _ref.manufacturingDate,
          expiryDate = _ref.expiryDate,
          batchNumber = _ref.batchNumber,
          sample = _ref.sample,
          condition = _ref.condition,
          unit = _ref.unit,
          quantity = _ref.quantity,
          typeOfTest = _ref.typeOfTest,
          testAccordingToSpecification = _ref.testAccordingToSpecification,
          requestAttachmentFileName = _ref.requestAttachmentFileName,
          requestAttachmentFileOriginalName = _ref.requestAttachmentFileOriginalName,
          requester = _ref.requester,
          requestApproveDate = _ref.requestApproveDate,
          requestApprover = _ref.requestApprover,
          requestReceiveDate = _ref.requestReceiveDate,
          estimationCloseDate = _ref.estimationCloseDate,
          requestReceiver = _ref.requestReceiver,
          tempReportNumber = _ref.tempReportNumber;
        var _ref2 = qaLaboratoryTestReport !== null && qaLaboratoryTestReport !== void 0 ? qaLaboratoryTestReport : {},
          reportDate = _ref2.reportDate,
          reportNumber = _ref2.reportNumber,
          testResult = _ref2.testResult,
          reportAttachmentFileName = _ref2.reportAttachmentFileName,
          reportAttachmentFileOriginalName = _ref2.reportAttachmentFileOriginalName,
          reporter = _ref2.reporter,
          reportApproveDate = _ref2.reportApproveDate,
          reportApprover = _ref2.reportApprover;
        var _e = {};
        _e.id = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest._id;
        _e.requestIds = [];
        for (var _i = 0; _i < qaLaboratoryTestRequests.length; _i++) {
          var _e$requestIds;
          var f = qaLaboratoryTestRequests[_i];
          (_e$requestIds = _e.requestIds) === null || _e$requestIds === void 0 || _e$requestIds.push(f === null || f === void 0 ? void 0 : f._id);
        }
        _e.requestDate = requestDate !== null && requestDate !== void 0 ? requestDate : null;
        _e.requestDateFormated = (0, _date.formatDateDmmyyyy)(requestDate);
        _e.requestNumber = requestNumber !== null && requestNumber !== void 0 ? requestNumber : null;
        _e.laboratory = laboratory !== null && laboratory !== void 0 ? laboratory : null;
        _e.organizationUnit = organizationUnit !== null && organizationUnit !== void 0 ? organizationUnit : null;
        _e.material = material !== null && material !== void 0 ? material : null;
        _e.type = type !== null && type !== void 0 ? type : null;
        _e.specification = specification !== null && specification !== void 0 ? specification : null;
        _e.program = program !== null && program !== void 0 ? program : null;
        _e.budgetNumber = budgetNumber !== null && budgetNumber !== void 0 ? budgetNumber : null;
        _e.reasonOfTest = reasonOfTest !== null && reasonOfTest !== void 0 ? reasonOfTest : null;
        _e.manufacturer = manufacturer !== null && manufacturer !== void 0 ? manufacturer : null;
        _e.manufacturingDate = manufacturingDate !== null && manufacturingDate !== void 0 ? manufacturingDate : null;
        _e.expiryDate = expiryDate !== null && expiryDate !== void 0 ? expiryDate : null;
        _e.batchNumber = batchNumber !== null && batchNumber !== void 0 ? batchNumber : null;
        _e.sample = sample !== null && sample !== void 0 ? sample : null;
        _e.condition = condition !== null && condition !== void 0 ? condition : null;
        _e.unit = unit !== null && unit !== void 0 ? unit : null;
        _e.quantity = quantity !== null && quantity !== void 0 ? quantity : null;
        _e.typeOfTest = typeOfTest !== null && typeOfTest !== void 0 ? typeOfTest : null;
        _e.organization = (_requester$organizati = requester === null || requester === void 0 || (_requester$organizati2 = requester.organization) === null || _requester$organizati2 === void 0 ? void 0 : _requester$organizati2.substring(0, 2)) !== null && _requester$organizati !== void 0 ? _requester$organizati : null;
        _e.testAccordingToSpecification = testAccordingToSpecification !== null && testAccordingToSpecification !== void 0 ? testAccordingToSpecification : null;
        _e.requestAttachmentFileName = requestAttachmentFileName !== null && requestAttachmentFileName !== void 0 ? requestAttachmentFileName : null;
        _e.requestAttachmentFileOriginalName = requestAttachmentFileOriginalName !== null && requestAttachmentFileOriginalName !== void 0 ? requestAttachmentFileOriginalName : null;
        _e.requesterName = (_requester$name2 = requester === null || requester === void 0 ? void 0 : requester.name) !== null && _requester$name2 !== void 0 ? _requester$name2 : null;
        _e.requesterNik = (_requester$nik2 = requester === null || requester === void 0 ? void 0 : requester.nik) !== null && _requester$nik2 !== void 0 ? _requester$nik2 : null;
        _e.requesterOrganization = (_requester$organizati3 = requester === null || requester === void 0 ? void 0 : requester.organization) !== null && _requester$organizati3 !== void 0 ? _requester$organizati3 : null;
        _e.requestApproveDate = requestApproveDate !== null && requestApproveDate !== void 0 ? requestApproveDate : null;
        _e.requestApproveDateFormated = (0, _date.formatDateDmmyyyy)(requestApproveDate);
        _e.requestApproverName = (_requestApprover$name2 = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.name) !== null && _requestApprover$name2 !== void 0 ? _requestApprover$name2 : null;
        _e.requestApproverNik = (_requestApprover$nik2 = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.nik) !== null && _requestApprover$nik2 !== void 0 ? _requestApprover$nik2 : null;
        _e.requestReceiveDate = requestReceiveDate !== null && requestReceiveDate !== void 0 ? requestReceiveDate : null;
        _e.requestReceiveDateFormated = (0, _date.formatDateDmmyyyy)(requestReceiveDate);
        _e.estimationCloseDate = estimationCloseDate !== null && estimationCloseDate !== void 0 ? estimationCloseDate : null;
        _e.estimationCloseDateFormated = (0, _date.formatDateDmmyyyy)(estimationCloseDate);
        _e.requestReceiverName = (_requestReceiver$name = requestReceiver === null || requestReceiver === void 0 ? void 0 : requestReceiver.name) !== null && _requestReceiver$name !== void 0 ? _requestReceiver$name : null;
        _e.tempReportNumber = tempReportNumber !== null && tempReportNumber !== void 0 ? tempReportNumber : null;
        _e.reportIds = [];
        for (var _i2 = 0; _i2 < qaLaboratoryTestReports.length; _i2++) {
          var _e$reportIds;
          var _f = qaLaboratoryTestReports[_i2];
          (_e$reportIds = _e.reportIds) === null || _e$reportIds === void 0 || _e$reportIds.push(_f === null || _f === void 0 ? void 0 : _f._id);
        }
        _e.reportDate = reportDate !== null && reportDate !== void 0 ? reportDate : null;
        _e.reportDateFormated = (0, _date.formatDateDmmyyyy)(reportDate);
        _e.reportNumber = reportNumber !== null && reportNumber !== void 0 ? reportNumber : tempReportNumber;
        _e.testResult = testResult !== null && testResult !== void 0 ? testResult : null;
        _e.reportAttachmentFileName = reportAttachmentFileName !== null && reportAttachmentFileName !== void 0 ? reportAttachmentFileName : null;
        _e.reportAttachmentFileOriginalName = reportAttachmentFileOriginalName !== null && reportAttachmentFileOriginalName !== void 0 ? reportAttachmentFileOriginalName : null;
        _e.reporterName = (_reporter$name2 = reporter === null || reporter === void 0 ? void 0 : reporter.name) !== null && _reporter$name2 !== void 0 ? _reporter$name2 : null;
        _e.reporterNik = (_reporter$nik2 = reporter === null || reporter === void 0 ? void 0 : reporter.nik) !== null && _reporter$nik2 !== void 0 ? _reporter$nik2 : null;
        _e.reportApproveDate = reportApproveDate !== null && reportApproveDate !== void 0 ? reportApproveDate : null;
        _e.reportApproveDateFormated = (0, _date.formatDateDmmyyyy)(reportApproveDate);
        _e.reportApproverName = (_reportApprover$name2 = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.name) !== null && _reportApprover$name2 !== void 0 ? _reportApprover$name2 : null;
        _e.reportApproverNik = (_reportApprover$nik2 = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.nik) !== null && _reportApprover$nik2 !== void 0 ? _reportApprover$nik2 : null;
        if (reportApprover !== null && reportApprover !== void 0 && reportApprover.name) {
          _e.status = 'Completed';
        } else if (reporter !== null && reporter !== void 0 && reporter.name) {
          _e.status = 'Report Awaiting Approval';
        } else if (requestReceiver !== null && requestReceiver !== void 0 && requestReceiver.name) {
          _e.status = 'On Process';
        } else if (requestApprover !== null && requestApprover !== void 0 && requestApprover.name) {
          _e.status = 'Awaiting Sample';
        } else {
          _e.status = 'Request Awaiting Approval';
        }
        qaLaboratoryTests.push(_e);
      }
      qaLaboratoryTests = qaLaboratoryTests.sort(function (a, b) {
        return (b === null || b === void 0 ? void 0 : b.requestDate) - (a === null || a === void 0 ? void 0 : a.requestDate);
      });
      return res.status(200).json({
        success: !!results,
        message: null,
        data: {
          qaLaboratoryTests: qaLaboratoryTests
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/all/:year').get(function (req, res) {
    var _req$params = req === null || req === void 0 ? void 0 : req.params,
      year = _req$params.year;
    var qaLaboratoryTests = [];
    _LaboratoryTest["default"].find().populate({
      path: 'qaLaboratoryTestRequests',
      model: 'qa.laboratory_test_requests',
      populate: [{
        path: 'requester',
        model: 'users'
      }, {
        path: 'requestApprover',
        model: 'users'
      }, {
        path: 'requestReceiver',
        model: 'users'
      }]
    }).populate({
      path: 'qaLaboratoryTestReports',
      model: 'qa.laboratory_test_reports',
      populate: [{
        path: 'reporter',
        model: 'users'
      }, {
        path: 'reportApprover',
        model: 'users'
      }]
    }).lean().then(function (results) {
      for (var i = 0; i < results.length; i++) {
        var qaLaboratoryTest = results[i];
        var qaLaboratoryTestRequests = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests;
        var qaLaboratoryTestReports = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestReports;
        var qaLaboratoryTestRequest = qaLaboratoryTestRequests[(qaLaboratoryTestRequests === null || qaLaboratoryTestRequests === void 0 ? void 0 : qaLaboratoryTestRequests.length) - 1];
        var qaLaboratoryTestReport = qaLaboratoryTestReports[(qaLaboratoryTestReports === null || qaLaboratoryTestReports === void 0 ? void 0 : qaLaboratoryTestReports.length) - 1];
        var yearRegex = /^\d{4}$/;
        if (!yearRegex.test(year)) {
          return res.status(400).json({
            success: false,
            message: 'bad request',
            data: null
          });
        }
        var startDate = new Date("".concat(+year - 1, "-01-01"));
        var endDate = new Date("".concat(+year, "-12-31"));
        var _ref3 = qaLaboratoryTestRequest !== null && qaLaboratoryTestRequest !== void 0 ? qaLaboratoryTestRequest : {},
          requestDate = _ref3.requestDate,
          requestNumber = _ref3.requestNumber,
          laboratory = _ref3.laboratory,
          organizationUnit = _ref3.organizationUnit,
          material = _ref3.material,
          type = _ref3.type,
          specification = _ref3.specification,
          program = _ref3.program,
          budgetNumber = _ref3.budgetNumber,
          reasonOfTest = _ref3.reasonOfTest,
          manufacturer = _ref3.manufacturer,
          manufacturingDate = _ref3.manufacturingDate,
          expiryDate = _ref3.expiryDate,
          batchNumber = _ref3.batchNumber,
          sample = _ref3.sample,
          condition = _ref3.condition,
          unit = _ref3.unit,
          quantity = _ref3.quantity,
          typeOfTest = _ref3.typeOfTest,
          testAccordingToSpecification = _ref3.testAccordingToSpecification,
          requestAttachmentFileName = _ref3.requestAttachmentFileName,
          requestAttachmentFileOriginalName = _ref3.requestAttachmentFileOriginalName,
          requester = _ref3.requester,
          requestApproveDate = _ref3.requestApproveDate,
          requestApprover = _ref3.requestApprover,
          requestReceiveDate = _ref3.requestReceiveDate,
          estimationCloseDate = _ref3.estimationCloseDate,
          requestReceiver = _ref3.requestReceiver,
          tempReportNumber = _ref3.tempReportNumber;
        var _ref4 = qaLaboratoryTestReport !== null && qaLaboratoryTestReport !== void 0 ? qaLaboratoryTestReport : {},
          reportDate = _ref4.reportDate,
          reportNumber = _ref4.reportNumber,
          testResult = _ref4.testResult,
          reportAttachmentFileName = _ref4.reportAttachmentFileName,
          reportAttachmentFileOriginalName = _ref4.reportAttachmentFileOriginalName,
          reporter = _ref4.reporter,
          reportApproveDate = _ref4.reportApproveDate,
          reportApprover = _ref4.reportApprover;
        if (new Date(requestDate) >= startDate && new Date(requestDate) <= endDate) {
          var _requester$organizati4, _requester$organizati5, _requester$name3, _requester$nik3, _requester$organizati6, _requestApprover$name3, _requestApprover$nik3, _requestReceiver$name2, _reporter$name3, _reporter$nik3, _reportApprover$name3, _reportApprover$nik3;
          var _e2 = {};
          _e2.id = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest._id;
          _e2.requestIds = [];
          for (var _i3 = 0; _i3 < qaLaboratoryTestRequests.length; _i3++) {
            var _e2$requestIds;
            var f = qaLaboratoryTestRequests[_i3];
            (_e2$requestIds = _e2.requestIds) === null || _e2$requestIds === void 0 || _e2$requestIds.push(f === null || f === void 0 ? void 0 : f._id);
          }
          _e2.requestDate = requestDate !== null && requestDate !== void 0 ? requestDate : null;
          _e2.requestDateFormated = (0, _date.formatDateDmmyyyy)(requestDate);
          _e2.requestNumber = requestNumber !== null && requestNumber !== void 0 ? requestNumber : null;
          _e2.laboratory = laboratory !== null && laboratory !== void 0 ? laboratory : null;
          _e2.organizationUnit = organizationUnit !== null && organizationUnit !== void 0 ? organizationUnit : null;
          _e2.material = material !== null && material !== void 0 ? material : null;
          _e2.type = type !== null && type !== void 0 ? type : null;
          _e2.specification = specification !== null && specification !== void 0 ? specification : null;
          _e2.program = program !== null && program !== void 0 ? program : null;
          _e2.budgetNumber = budgetNumber !== null && budgetNumber !== void 0 ? budgetNumber : null;
          _e2.reasonOfTest = reasonOfTest !== null && reasonOfTest !== void 0 ? reasonOfTest : null;
          _e2.manufacturer = manufacturer !== null && manufacturer !== void 0 ? manufacturer : null;
          _e2.manufacturingDate = manufacturingDate !== null && manufacturingDate !== void 0 ? manufacturingDate : null;
          _e2.expiryDate = expiryDate !== null && expiryDate !== void 0 ? expiryDate : null;
          _e2.batchNumber = batchNumber !== null && batchNumber !== void 0 ? batchNumber : null;
          _e2.sample = sample !== null && sample !== void 0 ? sample : null;
          _e2.condition = condition !== null && condition !== void 0 ? condition : null;
          _e2.unit = unit !== null && unit !== void 0 ? unit : null;
          _e2.quantity = quantity !== null && quantity !== void 0 ? quantity : null;
          _e2.typeOfTest = typeOfTest !== null && typeOfTest !== void 0 ? typeOfTest : null;
          _e2.organization = (_requester$organizati4 = requester === null || requester === void 0 || (_requester$organizati5 = requester.organization) === null || _requester$organizati5 === void 0 ? void 0 : _requester$organizati5.substring(0, 2)) !== null && _requester$organizati4 !== void 0 ? _requester$organizati4 : null;
          _e2.testAccordingToSpecification = testAccordingToSpecification !== null && testAccordingToSpecification !== void 0 ? testAccordingToSpecification : null;
          _e2.requestAttachmentFileName = requestAttachmentFileName !== null && requestAttachmentFileName !== void 0 ? requestAttachmentFileName : null;
          _e2.requestAttachmentFileOriginalName = requestAttachmentFileOriginalName !== null && requestAttachmentFileOriginalName !== void 0 ? requestAttachmentFileOriginalName : null;
          _e2.requesterName = (_requester$name3 = requester === null || requester === void 0 ? void 0 : requester.name) !== null && _requester$name3 !== void 0 ? _requester$name3 : null;
          _e2.requesterNik = (_requester$nik3 = requester === null || requester === void 0 ? void 0 : requester.nik) !== null && _requester$nik3 !== void 0 ? _requester$nik3 : null;
          _e2.requesterOrganization = (_requester$organizati6 = requester === null || requester === void 0 ? void 0 : requester.organization) !== null && _requester$organizati6 !== void 0 ? _requester$organizati6 : null;
          _e2.requestApproveDate = requestApproveDate !== null && requestApproveDate !== void 0 ? requestApproveDate : null;
          _e2.requestApproveDateFormated = (0, _date.formatDateDmmyyyy)(requestApproveDate);
          _e2.requestApproverName = (_requestApprover$name3 = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.name) !== null && _requestApprover$name3 !== void 0 ? _requestApprover$name3 : null;
          _e2.requestApproverNik = (_requestApprover$nik3 = requestApprover === null || requestApprover === void 0 ? void 0 : requestApprover.nik) !== null && _requestApprover$nik3 !== void 0 ? _requestApprover$nik3 : null;
          _e2.requestReceiveDate = requestReceiveDate !== null && requestReceiveDate !== void 0 ? requestReceiveDate : null;
          _e2.requestReceiveDateFormated = (0, _date.formatDateDmmyyyy)(requestReceiveDate);
          _e2.estimationCloseDate = estimationCloseDate !== null && estimationCloseDate !== void 0 ? estimationCloseDate : null;
          _e2.estimationCloseDateFormated = (0, _date.formatDateDmmyyyy)(estimationCloseDate);
          _e2.requestReceiverName = (_requestReceiver$name2 = requestReceiver === null || requestReceiver === void 0 ? void 0 : requestReceiver.name) !== null && _requestReceiver$name2 !== void 0 ? _requestReceiver$name2 : null;
          _e2.tempReportNumber = tempReportNumber !== null && tempReportNumber !== void 0 ? tempReportNumber : null;
          _e2.reportIds = [];
          for (var _i4 = 0; _i4 < qaLaboratoryTestReports.length; _i4++) {
            var _e2$reportIds;
            var _f2 = qaLaboratoryTestReports[_i4];
            (_e2$reportIds = _e2.reportIds) === null || _e2$reportIds === void 0 || _e2$reportIds.push(_f2 === null || _f2 === void 0 ? void 0 : _f2._id);
          }
          _e2.reportDate = reportDate !== null && reportDate !== void 0 ? reportDate : null;
          _e2.reportDateFormated = (0, _date.formatDateDmmyyyy)(reportDate);
          _e2.reportNumber = reportNumber !== null && reportNumber !== void 0 ? reportNumber : tempReportNumber;
          _e2.testResult = testResult !== null && testResult !== void 0 ? testResult : null;
          _e2.reportAttachmentFileName = reportAttachmentFileName !== null && reportAttachmentFileName !== void 0 ? reportAttachmentFileName : null;
          _e2.reportAttachmentFileOriginalName = reportAttachmentFileOriginalName !== null && reportAttachmentFileOriginalName !== void 0 ? reportAttachmentFileOriginalName : null;
          _e2.reporterName = (_reporter$name3 = reporter === null || reporter === void 0 ? void 0 : reporter.name) !== null && _reporter$name3 !== void 0 ? _reporter$name3 : null;
          _e2.reporterNik = (_reporter$nik3 = reporter === null || reporter === void 0 ? void 0 : reporter.nik) !== null && _reporter$nik3 !== void 0 ? _reporter$nik3 : null;
          _e2.reportApproveDate = reportApproveDate !== null && reportApproveDate !== void 0 ? reportApproveDate : null;
          _e2.reportApproveDateFormated = (0, _date.formatDateDmmyyyy)(reportApproveDate);
          _e2.reportApproverName = (_reportApprover$name3 = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.name) !== null && _reportApprover$name3 !== void 0 ? _reportApprover$name3 : null;
          _e2.reportApproverNik = (_reportApprover$nik3 = reportApprover === null || reportApprover === void 0 ? void 0 : reportApprover.nik) !== null && _reportApprover$nik3 !== void 0 ? _reportApprover$nik3 : null;
          if (reportApprover !== null && reportApprover !== void 0 && reportApprover.name) {
            _e2.status = 'Completed';
          } else if (reporter !== null && reporter !== void 0 && reporter.name) {
            _e2.status = 'Report Awaiting Approval';
          } else if (requestReceiver !== null && requestReceiver !== void 0 && requestReceiver.name) {
            _e2.status = 'On Process';
          } else if (requestApprover !== null && requestApprover !== void 0 && requestApprover.name) {
            _e2.status = 'Awaiting Sample';
          } else {
            _e2.status = 'Request Awaiting Approval';
          }
          qaLaboratoryTests.push(_e2);
        }
      }
      qaLaboratoryTests = qaLaboratoryTests.sort(function (a, b) {
        return (b === null || b === void 0 ? void 0 : b.requestDate) - (a === null || a === void 0 ? void 0 : a.requestDate);
      });
      return res.status(200).json({
        success: !!results,
        message: null,
        data: {
          qaLaboratoryTests: qaLaboratoryTests
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/create').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$file$filename, _req$file, _req$file$originalnam, _req$file2;
    var newDoc = req === null || req === void 0 ? void 0 : req.body;
    newDoc.requestDate = Date.now();
    newDoc.requestAttachmentFileName = (_req$file$filename = req === null || req === void 0 || (_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.filename) !== null && _req$file$filename !== void 0 ? _req$file$filename : null;
    newDoc.requestAttachmentFileOriginalName = (_req$file$originalnam = req === null || req === void 0 || (_req$file2 = req.file) === null || _req$file2 === void 0 ? void 0 : _req$file2.originalname) !== null && _req$file$originalnam !== void 0 ? _req$file$originalnam : null;
    new _LaboratoryTestRequest["default"](newDoc).save().then(function (qaLaboratoryTestRequest) {
      var _id = qaLaboratoryTestRequest._id;
      var saveQaLaboratoryTest = new _LaboratoryTest["default"]({
        qaLaboratoryTestRequests: [_id],
        qaLaboratoryTestReports: []
      }).save();
      var generatePdf = generateQaLaboratoryTestRequestPdf(_id);
      return Promise.all([saveQaLaboratoryTest, generatePdf]);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/edit/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$body;
    var _req$params2 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params2.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var deleteFile = (req === null || req === void 0 || (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.file) === 'null';
    var _req$body2 = req === null || req === void 0 ? void 0 : req.body,
      reporter = _req$body2.reporter,
      reportApprover = _req$body2.reportApprover,
      update = _objectWithoutProperties(_req$body2, _excluded);
    var qaLaboratoryTest;
    var qaLaboratoryTestRequestId;
    var qaLaboratoryTestReportId;
    var requestNumberCount;
    var requestNumberWithThisIdCount;
    if (!update.requestDate) {
      update.requestDate = Date.now();
    }
    if (req !== null && req !== void 0 && req.file) {
      var _req$file3 = req === null || req === void 0 ? void 0 : req.file,
        filename = _req$file3.filename,
        originalname = _req$file3.originalname;
      update.requestAttachmentFileName = filename;
      update.requestAttachmentFileOriginalName = originalname;
    } else if (deleteFile) {
      update.requestAttachmentFileName = null;
      update.requestAttachmentFileOriginalName = null;
    }
    _LaboratoryTest["default"].findOne(filter).then(function (laboratoryTest) {
      var _qaLaboratoryTest, _qaLaboratoryTest2, _qaLaboratoryTest3, _qaLaboratoryTest4;
      var filter = {
        requestNumber: update === null || update === void 0 ? void 0 : update.requestNumber
      };
      qaLaboratoryTest = laboratoryTest;
      qaLaboratoryTestRequestId = (_qaLaboratoryTest = qaLaboratoryTest) === null || _qaLaboratoryTest === void 0 ? void 0 : _qaLaboratoryTest.qaLaboratoryTestRequests[((_qaLaboratoryTest2 = qaLaboratoryTest) === null || _qaLaboratoryTest2 === void 0 || (_qaLaboratoryTest2 = _qaLaboratoryTest2.qaLaboratoryTestRequests) === null || _qaLaboratoryTest2 === void 0 ? void 0 : _qaLaboratoryTest2.length) - 1];
      qaLaboratoryTestReportId = (_qaLaboratoryTest3 = qaLaboratoryTest) === null || _qaLaboratoryTest3 === void 0 ? void 0 : _qaLaboratoryTest3.qaLaboratoryTestReports[((_qaLaboratoryTest4 = qaLaboratoryTest) === null || _qaLaboratoryTest4 === void 0 || (_qaLaboratoryTest4 = _qaLaboratoryTest4.qaLaboratoryTestReports) === null || _qaLaboratoryTest4 === void 0 ? void 0 : _qaLaboratoryTest4.length) - 1];
      return _LaboratoryTestRequest["default"].countDocuments(filter);
    }).then(function (count) {
      var filter = {
        _id: qaLaboratoryTestRequestId,
        requestNumber: update === null || update === void 0 ? void 0 : update.requestNumber
      };
      requestNumberCount = count;
      return _LaboratoryTestRequest["default"].countDocuments(filter);
    }).then(function (count) {
      var filter = {
        _id: qaLaboratoryTestRequestId
      };
      requestNumberWithThisIdCount = count;

      // if (requestNumberCount > requestNumberWithThisIdCount) {
      // 	return res.status(200).json({
      // 		message: 'Request number already exists.',
      // 	});
      // }

      _LaboratoryTestRequest["default"].findOneAndUpdate(filter, update).then(function (qaLaboratoryTestRequest) {
        var _id = qaLaboratoryTestRequest._id,
          requestAttachmentFileName = qaLaboratoryTestRequest.requestAttachmentFileName;
        var generatePdf = generateQaLaboratoryTestRequestPdf(_id);
        var oldFilePath = "./public/uploads/qaLaboratoryTests/".concat(requestAttachmentFileName);
        var handleOldFile = new Promise(function (resolve) {
          if (req !== null && req !== void 0 && req.file && requestAttachmentFileName || deleteFile) {
            _fs["default"].unlink(oldFilePath, function (err) {
              if (err) {
                console.error(err);
              }
            });
          }
          resolve();
        });
        return Promise.all([generatePdf, handleOldFile]);
      }).then(function () {
        if (qaLaboratoryTestReportId) {
          var _filter = {
            _id: qaLaboratoryTestReportId
          };
          if (reporter && reportApprover) {
            return _LaboratoryTestReport["default"].findOneAndUpdate(_filter, {
              reporter: reporter,
              reportApprover: reportApprover
            }, {
              "new": true
            });
          } else if (reporter) {
            return _LaboratoryTestReport["default"].findOneAndUpdate(_filter, {
              reporter: reporter
            }, {
              "new": true
            });
          } else if (reportApprover) {
            return _LaboratoryTestReport["default"].findOneAndUpdate(_filter, {
              reportApprover: reportApprover
            }, {
              "new": true
            });
          } else {
            return _LaboratoryTestReport["default"].findOne(_filter);
          }
        } else {
          return null;
        }
      }).then(function (qaLaboratoryTestReport) {
        if (qaLaboratoryTestReport) {
          generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
        } else {
          return false;
        }
      }).then(function () {
        io.sockets.emit('laboratory_test_data_updated');
        return res.status(200).json({
          success: true
        });
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/approve/:qaLaboratoryTestId').post(function (req, res) {
    var _req$params3 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params3.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var qaLaboratoryTestRequestId;
    _LaboratoryTest["default"].findOne(filter).then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL3;
      qaLaboratoryTestRequestId = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests[(qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL3 = qaLaboratoryTest.qaLaboratoryTestRequests) === null || _qaLaboratoryTest$qaL3 === void 0 ? void 0 : _qaLaboratoryTest$qaL3.length) - 1];
      var filter = {
        _id: qaLaboratoryTestRequestId
      };
      return _LaboratoryTestRequest["default"].findOne(filter);
    }).then(function (qaLaboratoryTestRequest) {
      var requestApprover = qaLaboratoryTestRequest.requestApprover;
      var filter = {
        _id: qaLaboratoryTestRequestId
      };
      var update = req === null || req === void 0 ? void 0 : req.body;
      if (requestApprover) {
        throw new Error('This laboratory test request is already approved.');
      }
      update.requestApproveDate = Date.now();
      return _LaboratoryTestRequest["default"].findOneAndUpdate(filter, update);
    }).then(function (qaLaboratoryTestRequest) {
      var _id = qaLaboratoryTestRequest._id;
      return generateQaLaboratoryTestRequestPdf(_id);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/delete/:qaLaboratoryTestId').post(function (req, res) {
    var _req$params4 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params4.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var qaLaboratoryTestRequests = [];
    var requestAttachmentFileNames = [];
    var qaLaboratoryTestRequestPdfs = [];
    _LaboratoryTest["default"].findOneAndDelete(filter).populate({
      path: 'qaLaboratoryTestRequests',
      model: 'qa.laboratory_test_requests'
    }).lean().then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL4;
      qaLaboratoryTestRequests = (_qaLaboratoryTest$qaL4 = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests) !== null && _qaLaboratoryTest$qaL4 !== void 0 ? _qaLaboratoryTest$qaL4 : [];
      if (qaLaboratoryTestRequests.length === 0) {
        throw new Error("This laboratory test request doesn't exists.");
      }
      return new Promise(function (resolve) {
        for (var i = 0; i < qaLaboratoryTestRequests.length; i++) {
          var _e3 = qaLaboratoryTestRequests[i];
          var _id = _e3._id,
            requestAttachmentFileName = _e3.requestAttachmentFileName;
          var pdfFilePath = "./public/temp/QA Laboratory Test Request ".concat(_id, ".pdf");
          if (requestAttachmentFileName) {
            var oldFilePath = "./public/uploads/qaLaboratoryTests/".concat(requestAttachmentFileName);
            requestAttachmentFileNames.push(oldFilePath);
          }
          qaLaboratoryTestRequestPdfs.push(pdfFilePath);
        }
        resolve();
      });
    }).then(function () {
      return new Promise(function (resolve) {
        for (var i = 0; i < requestAttachmentFileNames.length; i++) {
          var _e4 = requestAttachmentFileNames[i];
          _fs["default"].unlink(_e4, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        for (var _i5 = 0; _i5 < qaLaboratoryTestRequestPdfs.length; _i5++) {
          var _e5 = qaLaboratoryTestRequestPdfs[_i5];
          _fs["default"].unlink(_e5, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        resolve();
      });
    }).then(function () {
      _LaboratoryTestRequest["default"].deleteMany({
        _id: {
          $in: qaLaboratoryTestRequests
        }
      }, function (_err, result) {
        if (result.ok === 1) {
          io.sockets.emit('laboratory_test_data_updated');
          return res.status(200).json({
            success: true
          });
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/receive/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var filter = {
      _id: '5fb48634caa46232ac8b10ca'
    };
    var update = req === null || req === void 0 ? void 0 : req.body;
    var statisticDb = {};
    var qaLaboratoryRequestId;
    _Statistic["default"].findOne(filter).then(function (statistic) {
      var _req$params5 = req === null || req === void 0 ? void 0 : req.params,
        qaLaboratoryTestId = _req$params5.qaLaboratoryTestId;
      var filter = {
        _id: qaLaboratoryTestId
      };
      statisticDb = statistic;
      return _LaboratoryTest["default"].findOne(filter);
    }).then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL5;
      var qaLaboratoryTestRequestId = qaLaboratoryTest.qaLaboratoryTestRequests[(qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL5 = qaLaboratoryTest.qaLaboratoryTestRequests) === null || _qaLaboratoryTest$qaL5 === void 0 ? void 0 : _qaLaboratoryTest$qaL5.length) - 1];
      var filter = {
        _id: qaLaboratoryTestRequestId
      };
      return _LaboratoryTestRequest["default"].findOne(filter);
    }).then(function (qaLaboratoryTestRequest) {
      var _id = qaLaboratoryTestRequest._id,
        laboratory = qaLaboratoryTestRequest.laboratory,
        requestReceiver = qaLaboratoryTestRequest.requestReceiver;
      var _statisticDb = statisticDb,
        laboratoryTestReportCounterQa3100Sc = _statisticDb.laboratoryTestReportCounterQa3100Sc,
        laboratoryTestReportCounterQa3100Pc = _statisticDb.laboratoryTestReportCounterQa3100Pc,
        laboratoryTestReportCounterQa3100Kim = _statisticDb.laboratoryTestReportCounterQa3100Kim,
        laboratoryTestReportCounterQa3200Bc = _statisticDb.laboratoryTestReportCounterQa3200Bc,
        laboratoryTestReportCounterQa3200Mt = _statisticDb.laboratoryTestReportCounterQa3200Mt,
        laboratoryTestReportCounterQa3100ScYear = _statisticDb.laboratoryTestReportCounterQa3100ScYear,
        laboratoryTestReportCounterQa3100PcYear = _statisticDb.laboratoryTestReportCounterQa3100PcYear,
        laboratoryTestReportCounterQa3100KimYear = _statisticDb.laboratoryTestReportCounterQa3100KimYear,
        laboratoryTestReportCounterQa3200BcYear = _statisticDb.laboratoryTestReportCounterQa3200BcYear,
        laboratoryTestReportCounterQa3200MtYear = _statisticDb.laboratoryTestReportCounterQa3200MtYear;
      var month = (0, _moment["default"])().month() + 1;
      var year = (0, _moment["default"])().year();
      var statisticUpdate = {};
      if (requestReceiver) {
        throw new Error('This laboratory test request is already received.');
      }
      qaLaboratoryRequestId = _id;
      switch (laboratory) {
        case 'QA 3100 - Solution Control':
          if (laboratoryTestReportCounterQa3100ScYear !== year) {
            update.tempReportNumber = "1/QA3100/SC/".concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Sc = 1;
            statisticUpdate.laboratoryTestReportCounterQa3100ScYear = year;
          } else {
            update.tempReportNumber = "".concat(laboratoryTestReportCounterQa3100Sc + 1, "/QA3100/SC/").concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Sc = laboratoryTestReportCounterQa3100Sc + 1;
          }
          break;
        case 'QA 3100 - Process Control':
          if (laboratoryTestReportCounterQa3100PcYear !== year) {
            update.tempReportNumber = "1/QA3100/PC/".concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Pc = 1;
            statisticUpdate.laboratoryTestReportCounterQa3100PcYear = year;
          } else {
            update.tempReportNumber = "".concat(laboratoryTestReportCounterQa3100Pc + 1, "/QA3100/PC/").concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Pc = laboratoryTestReportCounterQa3100Pc + 1;
          }
          break;
        case 'QA 3100 - Kimia':
          if (laboratoryTestReportCounterQa3100KimYear !== year) {
            update.tempReportNumber = "1/QA3100/KIM/".concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Kim = 1;
            statisticUpdate.laboratoryTestReportCounterQa3100KimYear = year;
          } else {
            update.tempReportNumber = "".concat(laboratoryTestReportCounterQa3100Kim + 1, "/QA3100/KIM/").concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3100Kim = laboratoryTestReportCounterQa3100Kim + 1;
          }
          break;
        case 'QA 3200 - Bonding & Composite':
          if (laboratoryTestReportCounterQa3200BcYear !== year) {
            update.tempReportNumber = "1/QA3200/BC/".concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3200Bc = 1;
            statisticUpdate.laboratoryTestReportCounterQa3200BcYear = year;
          } else {
            update.tempReportNumber = "".concat(laboratoryTestReportCounterQa3200Bc + 1, "/QA3200/BC/").concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3200Bc = laboratoryTestReportCounterQa3200Bc + 1;
          }
          break;
        case 'QA 3200 - Metallurgy':
          if (laboratoryTestReportCounterQa3200MtYear !== year) {
            update.tempReportNumber = "1/QA3200/MT/".concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3200Mt = 1;
            statisticUpdate.laboratoryTestReportCounterQa3200MtYear = year;
          } else {
            update.tempReportNumber = "".concat(laboratoryTestReportCounterQa3200Mt + 1, "/QA3200/MT/").concat("0".concat(month).slice(-2), "/").concat(year);
            statisticUpdate.laboratoryTestReportCounterQa3200Mt = laboratoryTestReportCounterQa3200Mt + 1;
          }
          break;
      }
      return _Statistic["default"].findOneAndUpdate(filter, statisticUpdate);
    }).then(function () {
      var filter = {
        _id: qaLaboratoryRequestId
      };
      return _LaboratoryTestRequest["default"].findOneAndUpdate(filter, update);
    }).then(function (qaLaboratoryTestRequest) {
      var _id = qaLaboratoryTestRequest._id;
      return generateQaLaboratoryTestRequestPdf(_id);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/report/create/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$file$filename2, _req$file4, _req$file$originalnam2, _req$file5;
    var _req$params6 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params6.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var newDoc = req === null || req === void 0 ? void 0 : req.body;
    var qaLaboratoryTestReportId;
    newDoc.reportAttachmentFileName = (_req$file$filename2 = req === null || req === void 0 || (_req$file4 = req.file) === null || _req$file4 === void 0 ? void 0 : _req$file4.filename) !== null && _req$file$filename2 !== void 0 ? _req$file$filename2 : null;
    newDoc.reportAttachmentFileOriginalName = (_req$file$originalnam2 = req === null || req === void 0 || (_req$file5 = req.file) === null || _req$file5 === void 0 ? void 0 : _req$file5.originalname) !== null && _req$file$originalnam2 !== void 0 ? _req$file$originalnam2 : null;
    _LaboratoryTest["default"].findOne(filter).then(function (qaLaboratoryTest) {
      var qaLaboratoryTestReports = qaLaboratoryTest.qaLaboratoryTestReports;
      if (qaLaboratoryTestReports && (qaLaboratoryTestReports === null || qaLaboratoryTestReports === void 0 ? void 0 : qaLaboratoryTestReports.length) > 1) {
        throw new Error('This laboratory request report already exists.');
      }
      return new _LaboratoryTestReport["default"](newDoc).save();
    }).then(function (qaLaboratoryTestReport) {
      var _id = qaLaboratoryTestReport._id;
      var filter = {
        _id: qaLaboratoryTestId
      };
      qaLaboratoryTestReportId = _id;
      return _LaboratoryTest["default"].findOne(filter);
    }).then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL6;
      qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL6 = qaLaboratoryTest.qaLaboratoryTestReports) === null || _qaLaboratoryTest$qaL6 === void 0 || _qaLaboratoryTest$qaL6.push(qaLaboratoryTestReportId);
      return qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.save();
    }).then(function () {
      return generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/report/edit/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$body3;
    var _req$params7 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params7.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var deleteFile = (req === null || req === void 0 || (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.file) === 'null';
    var update = req === null || req === void 0 ? void 0 : req.body;
    var reports;
    if (req !== null && req !== void 0 && req.file) {
      var _req$file6 = req === null || req === void 0 ? void 0 : req.file,
        filename = _req$file6.filename,
        originalname = _req$file6.originalname;
      update.reportAttachmentFileName = filename;
      update.reportAttachmentFileOriginalName = originalname;
    } else if (deleteFile) {
      update.reportAttachmentFileName = null;
      update.reportAttachmentFileOriginalName = null;
    }
    _LaboratoryTest["default"].findOne(filter).populate({
      path: 'qaLaboratoryTestReports',
      model: 'qa.laboratory_test_reports'
    }).lean().then(function (qaLaboratoryTest) {
      var qaLaboratoryTestReports = qaLaboratoryTest.qaLaboratoryTestReports;
      var filter = {
        _id: qaLaboratoryTestReports[(qaLaboratoryTestReports === null || qaLaboratoryTestReports === void 0 ? void 0 : qaLaboratoryTestReports.length) - 1]
      };
      reports = qaLaboratoryTestReports;
      return _LaboratoryTestReport["default"].findOneAndUpdate(filter, update);
    }).then(function (qaLaboratoryTestReport) {
      var reportAttachmentFileName = qaLaboratoryTestReport.reportAttachmentFileName;
      var generatePdf = generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
      var handleOldFile = new Promise(function (resolve) {
        var sameAttachmentReports = [];
        for (var i = 0; i < reports.length; i++) {
          var _e6 = reports[i];
          if (_e6.reportAttachmentFileName === reportAttachmentFileName) {
            sameAttachmentReports.push(_e6);
          }
        }
        if (req !== null && req !== void 0 && req.file && reportAttachmentFileName && sameAttachmentReports.length < 2 || deleteFile && sameAttachmentReports.length < 2) {
          var oldFilePath = "./public/uploads/qaLaboratoryTests/".concat(reportAttachmentFileName);
          _fs["default"].unlink(oldFilePath, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        resolve();
      });
      return Promise.all([generatePdf, handleOldFile]);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/report/approve/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$params8 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params8.qaLaboratoryTestId;
    var filter = {
      _id: qaLaboratoryTestId
    };
    var qaLaboratoryTestReportId;
    _LaboratoryTest["default"].findOne(filter).then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL7;
      qaLaboratoryTestReportId = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestReports[(qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL7 = qaLaboratoryTest.qaLaboratoryTestReports) === null || _qaLaboratoryTest$qaL7 === void 0 ? void 0 : _qaLaboratoryTest$qaL7.length) - 1];
      var filter = {
        _id: qaLaboratoryTestReportId
      };
      return _LaboratoryTestReport["default"].findOne(filter);
    }).then(function (qaLaboratoryTestReport) {
      var reportApprover = qaLaboratoryTestReport.reportApprover;
      var filter = {
        _id: qaLaboratoryTestReportId
      };
      var update = req === null || req === void 0 ? void 0 : req.body;
      if (reportApprover) {
        throw new Error('This laboratory test report is already approved.');
      }
      update.reportApproveDate = Date.now();
      return _LaboratoryTestReport["default"].findOneAndUpdate(filter, update);
    }).then(function () {
      return generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/report/revise/:qaLaboratoryTestId').post(_io.laboratoryTestUpload.single('file'), function (req, res) {
    var _req$body4;
    var _req$params9 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params9.qaLaboratoryTestId;
    var newDoc = req === null || req === void 0 ? void 0 : req.body;
    var qaLaboratoryTestReportId;
    if (req !== null && req !== void 0 && req.file) {
      var _req$file7, _req$file8;
      newDoc.reportAttachmentFileName = req === null || req === void 0 || (_req$file7 = req.file) === null || _req$file7 === void 0 ? void 0 : _req$file7.filename;
      newDoc.reportAttachmentFileOriginalName = req === null || req === void 0 || (_req$file8 = req.file) === null || _req$file8 === void 0 ? void 0 : _req$file8.originalname;
    } else if ((req === null || req === void 0 || (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.file) === 'null') {
      newDoc.reportAttachmentFileName = null;
      newDoc.reportAttachmentFileOriginalName = null;
    }
    new _LaboratoryTestReport["default"](newDoc).save().then(function (qaLaboratoryTestReport) {
      var _id = qaLaboratoryTestReport._id;
      var filter = {
        _id: qaLaboratoryTestId
      };
      qaLaboratoryTestReportId = _id;
      return _LaboratoryTest["default"].findOne(filter);
    }).then(function (qaLaboratoryTest) {
      var _qaLaboratoryTest$qaL8;
      qaLaboratoryTest === null || qaLaboratoryTest === void 0 || (_qaLaboratoryTest$qaL8 = qaLaboratoryTest.qaLaboratoryTestReports) === null || _qaLaboratoryTest$qaL8 === void 0 || _qaLaboratoryTest$qaL8.push(qaLaboratoryTestReportId);
      return qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.save();
    }).then(function () {
      return generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
    }).then(function () {
      io.sockets.emit('laboratory_test_data_updated');
      return res.status(200).json({
        success: true
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/request/download/pdf/:qaLaboratoryTestId').get(function (req, res) {
    var _req$params10 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params10.qaLaboratoryTestId;
    var path = "./public/temp/QA Laboratory Test Request ".concat(qaLaboratoryTestId, ".pdf");
    var file = _fs["default"].createReadStream(path);
    var stat = _fs["default"].statSync(path);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', "attachment; filename=Request For Laboratory Test ".concat(qaLaboratoryTestId, ".pdf"));
    file.pipe(res);
  });
  router.route('/report/download/pdf/:qaLaboratoryTestId').get(function (req, res) {
    var _req$params11 = req === null || req === void 0 ? void 0 : req.params,
      qaLaboratoryTestId = _req$params11.qaLaboratoryTestId;
    var path = "./public/temp/QA Laboratory Test Report ".concat(qaLaboratoryTestId, ".pdf");
    var file = _fs["default"].createReadStream(path);
    var stat = _fs["default"].statSync(path);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', "attachment; filename=Report Of Laboratory Test ".concat(qaLaboratoryTestId, ".pdf"));
    file.pipe(res);
  });
  router.route('/attachment/download/:fileName').get(function (req, res) {
    var _req$params12 = req === null || req === void 0 ? void 0 : req.params,
      fileName = _req$params12.fileName;
    var path = "./public/uploads/qaLaboratoryTests/".concat(fileName);
    var file = _fs["default"].createReadStream(path);
    var stat = _fs["default"].statSync(path);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', 'attachment; filename=Attachment');
    file.pipe(res);
  });
  router.route('/excel').get(function (req, res) {
    _LaboratoryTest["default"].find().populate({
      path: 'qaLaboratoryTestRequests',
      model: 'qa.laboratory_test_requests',
      populate: [{
        path: 'requester',
        model: 'users'
      }, {
        path: 'requestApprover',
        model: 'users'
      }, {
        path: 'requestReceiver',
        model: 'users'
      }]
    }).populate({
      path: 'qaLaboratoryTestReports',
      model: 'qa.laboratory_test_reports',
      populate: [{
        path: 'reporter',
        model: 'users'
      }, {
        path: 'reportApprover',
        model: 'users'
      }]
    }).lean().then(function (results) {
      var data = {
        columns: [{
          name: 'No.',
          filterButton: false
        }, {
          name: 'ID',
          filterButton: false
        }, {
          name: 'Laboratory',
          filterButton: true
        }, {
          name: 'Status',
          filterButton: true
        }, {
          name: 'Request Date',
          filterButton: true
        }, {
          name: 'Request Number',
          filterButton: false
        }, {
          name: 'Requester',
          filterButton: true
        }, {
          name: 'Request Approver',
          filterButton: true
        }, {
          name: 'Sample Receive Date',
          filterButton: true
        }, {
          name: 'Sample Receiver',
          filterButton: true
        }, {
          name: 'Estimation Close Date',
          filterButton: true
        }, {
          name: 'Report Date',
          filterButton: true
        }, {
          name: 'Report Number',
          filterButton: false
        }, {
          name: 'Reporter',
          filterButton: true
        }, {
          name: 'Report Approver',
          filterButton: true
        }, {
          name: 'Request Pdf',
          filterButton: false
        }, {
          name: 'Request Attachment',
          filterButton: false
        }, {
          name: 'Report Pdf',
          filterButton: false
        }, {
          name: 'Report Attachment',
          filterButton: false
        }],
        rows: []
      };
      results.map(function (result, index) {
        var request = result.qaLaboratoryTestRequests[result.qaLaboratoryTestRequests.length - 1];
        var report = result.qaLaboratoryTestReports[result.qaLaboratoryTestReports.length - 1];
        var rows = [];
        var status = '';
        if (report !== null && report !== void 0 && report.reportApprover) {
          status = 'Completed';
        } else if (report !== null && report !== void 0 && report.reporter) {
          status = 'Report Awaiting Approval';
        } else if (request !== null && request !== void 0 && request.requestReceiver) {
          status = 'On Process';
        } else if (request !== null && request !== void 0 && request.requestApprover) {
          status = 'Awaiting Sample';
        } else if (request !== null && request !== void 0 && request.requester) {
          status = 'Request Awaiting Approval';
        }
        if (request) {
          var _result$_id, _request$laboratory, _request$requestNumbe, _request$requester$na, _request$requester, _request$requestAppro, _request$requestAppro2, _request$requestRecei, _request$requestRecei2, _request$estimationCl, _request$_id;
          rows[0] = index + 1;
          rows[1] = String((_result$_id = result === null || result === void 0 ? void 0 : result._id) !== null && _result$_id !== void 0 ? _result$_id : '');
          rows[2] = (_request$laboratory = request === null || request === void 0 ? void 0 : request.laboratory) !== null && _request$laboratory !== void 0 ? _request$laboratory : '';
          rows[3] = status;
          rows[4] = request !== null && request !== void 0 && request.requestDate ? new Date(request.requestDate) : '';
          rows[5] = (_request$requestNumbe = request === null || request === void 0 ? void 0 : request.requestNumber) !== null && _request$requestNumbe !== void 0 ? _request$requestNumbe : '';
          rows[6] = (_request$requester$na = request === null || request === void 0 || (_request$requester = request.requester) === null || _request$requester === void 0 ? void 0 : _request$requester.name) !== null && _request$requester$na !== void 0 ? _request$requester$na : '';
          rows[7] = (_request$requestAppro = request === null || request === void 0 || (_request$requestAppro2 = request.requestApprover) === null || _request$requestAppro2 === void 0 ? void 0 : _request$requestAppro2.name) !== null && _request$requestAppro !== void 0 ? _request$requestAppro : '';
          rows[8] = request !== null && request !== void 0 && request.requestReceiveDate ? new Date(request === null || request === void 0 ? void 0 : request.requestReceiveDate) : '';
          rows[9] = (_request$requestRecei = request === null || request === void 0 || (_request$requestRecei2 = request.requestReceiver) === null || _request$requestRecei2 === void 0 ? void 0 : _request$requestRecei2.name) !== null && _request$requestRecei !== void 0 ? _request$requestRecei : '';
          rows[10] = (_request$estimationCl = request === null || request === void 0 ? void 0 : request.estimationCloseDate) !== null && _request$estimationCl !== void 0 ? _request$estimationCl : '';
          rows[15] = "".concat(_url.pdfUrl, "QA Laboratory Test Request ").concat(String((_request$_id = request === null || request === void 0 ? void 0 : request._id) !== null && _request$_id !== void 0 ? _request$_id : ''), ".pdf");
          rows[16] = request !== null && request !== void 0 && request.requestAttachmentFileName ? "".concat(_url.uploadUrl).concat(request === null || request === void 0 ? void 0 : request.requestAttachmentFileName) : '-';
        }
        if (report) {
          var _report$reportNumber, _report$reporter$name, _report$reporter, _report$reportApprove, _report$reportApprove2, _report$_id;
          rows[11] = report !== null && report !== void 0 && report.reportDate ? new Date(report.reportDate) : '';
          rows[12] = (_report$reportNumber = report === null || report === void 0 ? void 0 : report.reportNumber) !== null && _report$reportNumber !== void 0 ? _report$reportNumber : '';
          rows[13] = (_report$reporter$name = report === null || report === void 0 || (_report$reporter = report.reporter) === null || _report$reporter === void 0 ? void 0 : _report$reporter.name) !== null && _report$reporter$name !== void 0 ? _report$reporter$name : '';
          rows[14] = (_report$reportApprove = report === null || report === void 0 || (_report$reportApprove2 = report.reportApprover) === null || _report$reportApprove2 === void 0 ? void 0 : _report$reportApprove2.name) !== null && _report$reportApprove !== void 0 ? _report$reportApprove : '';
          rows[17] = "".concat(_url.pdfUrl, "QA Laboratory Test Report ").concat(String((_report$_id = report === null || report === void 0 ? void 0 : report._id) !== null && _report$_id !== void 0 ? _report$_id : ''), ".pdf");
          rows[18] = report !== null && report !== void 0 && report.reportAttachmentFileName ? "".concat(_url.uploadUrl).concat(report === null || report === void 0 ? void 0 : report.reportAttachmentFileName) : '-';
        } else {
          rows[11] = '';
          rows[12] = '';
          rows[13] = '';
          rows[14] = '';
          rows[17] = '';
          rows[18] = '';
        }
        data.rows.push(rows);
      });
      return data;
    }).then(function (data) {
      var fileName = 'F-DP 704.04.xlsx';
      var workbook = new ExcelJS.Workbook();
      workbook.creator = 'Super Admin';
      workbook.lastModifiedBy = 'Super Admin';
      workbook.created = new Date();
      workbook.modified = new Date();
      var worksheet = workbook.addWorksheet('My Sheet', {
        pageSetup: {
          orientation: 'landscape'
        }
      });
      worksheet.addTable({
        name: 'Table',
        ref: 'A1',
        headerRow: true,
        totalsRow: false,
        style: {
          theme: 'TableStyleMedium2',
          showRowStripes: false
        },
        columns: data.columns,
        rows: data.rows
      });
      (0, _excel.autoWidth)(worksheet, [4, 8, 10, 11]);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      workbook.xlsx.write(res).then(function () {
        res.end();
      });
    });
  });
  router.route('/regenerate-pdfs').post(function (_req, res) {
    var qaLaboratoryTests = [];
    _LaboratoryTest["default"].find().populate({
      path: 'qaLaboratoryTestRequests',
      model: 'qa.laboratory_test_requests',
      populate: [{
        path: 'requester',
        model: 'users'
      }, {
        path: 'requestApprover',
        model: 'users'
      }, {
        path: 'requestReceiver',
        model: 'users'
      }]
    }).populate({
      path: 'qaLaboratoryTestReports',
      model: 'qa.laboratory_test_reports',
      populate: [{
        path: 'reporter',
        model: 'users'
      }, {
        path: 'reportApprover',
        model: 'users'
      }]
    }).lean().then(function (results) {
      for (var i = 0; i < results.length; i++) {
        var qaLaboratoryTest = results[i];
        var qaLaboratoryTestRequests = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestRequests;
        var qaLaboratoryTestReports = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest.qaLaboratoryTestReports;
        var _e7 = {};
        _e7.id = qaLaboratoryTest === null || qaLaboratoryTest === void 0 ? void 0 : qaLaboratoryTest._id;
        _e7.requestIds = [];
        for (var _i6 = 0; _i6 < qaLaboratoryTestRequests.length; _i6++) {
          var _e7$requestIds;
          var f = qaLaboratoryTestRequests[_i6];
          (_e7$requestIds = _e7.requestIds) === null || _e7$requestIds === void 0 || _e7$requestIds.push(f === null || f === void 0 ? void 0 : f._id);
        }
        _e7.reportIds = [];
        for (var _i7 = 0; _i7 < qaLaboratoryTestReports.length; _i7++) {
          var _e7$reportIds;
          var _f3 = qaLaboratoryTestReports[_i7];
          (_e7$reportIds = _e7.reportIds) === null || _e7$reportIds === void 0 || _e7$reportIds.push(_f3 === null || _f3 === void 0 ? void 0 : _f3._id);
        }
        qaLaboratoryTests.push(_e7);
      }
      qaLaboratoryTests = qaLaboratoryTests.sort(function (a, b) {
        return (b === null || b === void 0 ? void 0 : b.requestDate) - (a === null || a === void 0 ? void 0 : a.requestDate);
      });
      var promises = [];
      qaLaboratoryTests.forEach(function (test) {
        test.requestIds.forEach(function (requestId) {
          promises.push(generateQaLaboratoryTestRequestPdf(requestId));
        });
        test.reportIds.forEach(function (reportId) {
          promises.push(generateQaLaboratoryTestReportPdf(e.id, reportId));
        });
      });
      Promise.all(promises).then(function () {
        console.log('All PDFs regenerated successfully.');
      })["catch"](function (err) {
        (0, _log.log)(err);
      });
      return res.status(200).json({
        success: !!results,
        message: null,
        data: 'Processing'
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  return router;
};