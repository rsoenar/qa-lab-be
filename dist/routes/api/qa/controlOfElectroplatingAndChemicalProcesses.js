"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ControlOfElectroplatingAndChemicalProcessSheet = _interopRequireDefault(require("../../../models/qa/ControlOfElectroplatingAndChemicalProcessSheet"));
var _ControlOfElectroplatingAndChemicalProcessTemplate = _interopRequireDefault(require("../../../models/qa/ControlOfElectroplatingAndChemicalProcessTemplate"));
var _errorManager = require("../../../utils/errors/errorManager");
var _io = require("../../../utils/io");
var _date = require("../../../utils/date");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
var _default = function _default(io) {
  var setSignedDate = function setSignedDate(doc) {
    var operator = doc.operator,
      inspector = doc.inspector,
      laboratoriumPersonnel = doc.laboratoriumPersonnel,
      beforeSaltSprayTestingLaboratoriumPersonnel = doc.beforeSaltSprayTestingLaboratoriumPersonnel,
      afterSaltSprayTestingLaboratoriumPersonnel = doc.afterSaltSprayTestingLaboratoriumPersonnel,
      verificator = doc.verificator;
    doc.operatorSignedDate = operator ? _date.today : undefined;
    doc.inspectorSignedDate = inspector ? _date.today : undefined;
    doc.laboratoriumPersonnelSignedDate = laboratoriumPersonnel ? _date.today : undefined;
    doc.beforeSaltSprayTestingLaboratoriumPersonnelSignedDate = beforeSaltSprayTestingLaboratoriumPersonnel ? _date.today : undefined;
    doc.afterSaltSprayTestingLaboratoriumPersonnelSignedDate = afterSaltSprayTestingLaboratoriumPersonnel ? _date.today : undefined;
    doc.verificatorSignedDate = verificator ? _date.today : undefined;
    return doc;
  };

  // Template
  router.route('/templates').post(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var doc = setSignedDate(req === null || req === void 0 ? void 0 : req.body);
    new _ControlOfElectroplatingAndChemicalProcessTemplate["default"](doc).save().then(function (created) {
      io.sockets.emit('control_of_electroplating_and_chemical_process_templates_updated');
      return res.status(201).json({
        status: created ? 'success' : 'fail',
        data: {
          created: created
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/templates').get(function (_req, res, next) {
    _ControlOfElectroplatingAndChemicalProcessTemplate["default"].find().populate('operator').populate('inspector').populate('laboratoriumPersonnel').populate('beforeSaltSprayTestingLaboratoriumPersonnel').populate('afterSaltSprayTestingLaboratoriumPersonnel').populate('verificator').then(function (templates) {
      io.sockets.emit('control_of_electroplating_and_chemical_process_templates_updated');
      return res.status(200).json({
        status: templates ? 'success' : 'fail',
        data: {
          templates: templates
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/templates/:templateId').put(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var params = req.params,
      body = req.body;
    var replacement = setSignedDate(body);
    _ControlOfElectroplatingAndChemicalProcessTemplate["default"].findOneAndReplace({
      _id: params === null || params === void 0 ? void 0 : params.templateId
    }, replacement).then(function (replaced) {
      if (replaced == null) {
        throw new _errorManager.NotFoundError('Template ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_templates_updated');
      return res.status(200).json({
        status: replaced ? 'success' : 'fail',
        data: {
          replaced: replaced
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/templates/:templateId').patch(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var params = req.params,
      body = req.body;
    var update = setSignedDate(body);
    _ControlOfElectroplatingAndChemicalProcessTemplate["default"].findOneAndUpdate({
      _id: params === null || params === void 0 ? void 0 : params.templateId
    }, update).then(function (updated) {
      if (updated == null) {
        throw new _errorManager.NotFoundError('Template ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_templates_updated');
      return res.status(200).json({
        status: updated ? 'success' : 'fail',
        data: {
          updated: updated
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/templates/:templateId')["delete"](_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var _req$params;
    _ControlOfElectroplatingAndChemicalProcessTemplate["default"].findOneAndDelete({
      _id: req === null || req === void 0 ? void 0 : (_req$params = req.params) === null || _req$params === void 0 ? void 0 : _req$params.templateId
    }).then(function (deleted) {
      if (deleted == null) {
        throw new _errorManager.NotFoundError('Template ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_templates_updated');
      return res.status(200).json({
        status: 'success',
        data: {
          deleted: deleted
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });

  // Sheets
  router.route('/sheets').post(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var doc = setSignedDate(req === null || req === void 0 ? void 0 : req.body);
    new _ControlOfElectroplatingAndChemicalProcessSheet["default"](doc).save().then(function (created) {
      io.sockets.emit('control_of_electroplating_and_chemical_process_sheets_updated');
      return res.status(201).json({
        status: created ? 'success' : 'fail',
        data: {
          created: created
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/sheets').get(function (_req, res, next) {
    _ControlOfElectroplatingAndChemicalProcessSheet["default"].find().populate('operator').populate('inspector').populate('laboratoriumPersonnel').populate('beforeSaltSprayTestingLaboratoriumPersonnel').populate('afterSaltSprayTestingLaboratoriumPersonnel').populate('verificator').then(function (sheets) {
      io.sockets.emit('control_of_electroplating_and_chemical_process_sheets_updated');
      return res.status(200).json({
        status: sheets ? 'success' : 'fail',
        data: {
          sheets: sheets
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/sheets/:sheetId').put(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var params = req.params,
      body = req.body;
    var replacement = setSignedDate(body);
    _ControlOfElectroplatingAndChemicalProcessSheet["default"].findOneAndReplace({
      _id: params === null || params === void 0 ? void 0 : params.sheetId
    }, replacement).then(function (replaced) {
      if (replaced == null) {
        throw new _errorManager.NotFoundError('Sheet ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_sheets_updated');
      return res.status(200).json({
        status: replaced ? 'success' : 'fail',
        data: {
          replaced: replaced
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/sheets/:sheetId').patch(_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var params = req.params,
      body = req.body;
    var update = setSignedDate(body);
    _ControlOfElectroplatingAndChemicalProcessSheet["default"].findOneAndUpdate({
      _id: params === null || params === void 0 ? void 0 : params.sheetId
    }, update).then(function (updated) {
      if (updated == null) {
        throw new _errorManager.NotFoundError('Sheet ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_sheets_updated');
      return res.status(200).json({
        status: updated ? 'success' : 'fail',
        data: {
          updated: updated
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  router.route('/sheets/:sheetId')["delete"](_io.electroplatingChemicalProcessControlUpload.single('file'), function (req, res, next) {
    var _req$params2;
    _ControlOfElectroplatingAndChemicalProcessSheet["default"].findOneAndDelete({
      _id: req === null || req === void 0 ? void 0 : (_req$params2 = req.params) === null || _req$params2 === void 0 ? void 0 : _req$params2.sheetId
    }).then(function (deleted) {
      if (deleted == null) {
        throw new _errorManager.NotFoundError('Sheet ID was not found');
      }
      io.sockets.emit('control_of_electroplating_and_chemical_process_sheets_updated');
      return res.status(200).json({
        status: 'success',
        data: {
          deleted: deleted
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  });
  return router;
};
exports["default"] = _default;