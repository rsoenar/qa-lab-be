"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ChemicalSolutionControlWorksheet = _interopRequireDefault(require("../../../models/qa/ChemicalSolutionControlWorksheet"));
var _io = require("../../../utils/io");
var _date = require("../../../utils/date");
var _log = require("../../../utils/log");
var _excluded = ["_id", "__v", "revised", "creator", "solutionTargetLimits", "solutionSpecificationReferences", "analysisSolutions", "records"],
  _excluded2 = ["_id", "__v", "creator", "verifier"],
  _excluded3 = ["_id", "__v", "revised", "creator", "solutionTargetLimits", "solutionSpecificationReferences", "analysisSolutions", "records"],
  _excluded4 = ["_id", "__v", "creator", "verifier"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var router = (0, _express.Router)();
var _default = exports["default"] = function _default(io) {
  router.route('/worksheet/all').get(function (_req, res) {
    var qaChemicalSolutionControlWorksheets = [];
    _ChemicalSolutionControlWorksheet["default"].find().populate('revisedWorksheet').populate('creator').populate('records.creator').populate('records.verifier').lean().then(function (results) {
      qaChemicalSolutionControlWorksheets = results.map(function (worksheet) {
        var _id = worksheet._id,
          __v = worksheet.__v,
          revised = worksheet.revised,
          creator = worksheet.creator,
          solutionTargetLimits = worksheet.solutionTargetLimits,
          solutionSpecificationReferences = worksheet.solutionSpecificationReferences,
          analysisSolutions = worksheet.analysisSolutions,
          records = worksheet.records,
          mappedWorksheet = _objectWithoutProperties(worksheet, _excluded);
        mappedWorksheet.id = String(_id);
        mappedWorksheet.creationDateFormated = (0, _date.formatDateDmmyyyy)(mappedWorksheet === null || mappedWorksheet === void 0 ? void 0 : mappedWorksheet.creationDate);
        mappedWorksheet.revised = revised ? 'Revised' : 'Active';
        mappedWorksheet.creatorName = creator === null || creator === void 0 ? void 0 : creator.name;
        for (var i = 0; i < analysisSolutions.length; i++) {
          var e = analysisSolutions[i];
          delete e._id;
        }
        mappedWorksheet.analysisSolutions = analysisSolutions;
        for (var _i = 0; _i < solutionSpecificationReferences.length; _i++) {
          var _e = solutionSpecificationReferences[_i];
          delete _e._id;
        }
        mappedWorksheet.solutionSpecificationReferences = solutionSpecificationReferences;
        for (var _i2 = 0; _i2 < solutionTargetLimits.length; _i2++) {
          var _e2 = solutionTargetLimits[_i2];
          delete _e2._id;
        }
        mappedWorksheet.solutionTargetLimits = solutionTargetLimits;
        mappedWorksheet.records = [];
        for (var _i3 = 0; _i3 < records.length; _i3++) {
          var _records$_i = records[_i3],
            _id2 = _records$_i._id,
            _v = _records$_i.__v,
            _creator = _records$_i.creator,
            verifier = _records$_i.verifier,
            _e3 = _objectWithoutProperties(_records$_i, _excluded2);
          _e3.id = _id2;
          _e3.creatorName = _creator === null || _creator === void 0 ? void 0 : _creator.name;
          _e3.verifierName = verifier === null || verifier === void 0 ? void 0 : verifier.name;
          _e3.sampleTakenDateFormated = (0, _date.formatDateDmmyyyy)(_e3 === null || _e3 === void 0 ? void 0 : _e3.sampleTakenDate);
          _e3.sampleAnalysisDateFormated = (0, _date.formatDateDmmyyyy)(_e3 === null || _e3 === void 0 ? void 0 : _e3.sampleAnalysisDate);
          _e3.chemicalChargingRecordReceivedDateFormated = (0, _date.formatDateDmmyyyy)(_e3 === null || _e3 === void 0 ? void 0 : _e3.chemicalChargingRecordReceivedDate);
          mappedWorksheet.records.push(_e3);
        }
        mappedWorksheet.records.sort(function (a, b) {
          return (b === null || b === void 0 ? void 0 : b.sampleTakenDate) - (a === null || a === void 0 ? void 0 : a.sampleTakenDate);
        });
        return mappedWorksheet;
      }).sort(function (a, b) {
        return a.solutionProcess.localeCompare(b.solutionProcess);
      });
      return res.status(200).json({
        success: true,
        message: null,
        data: {
          qaChemicalSolutionControlWorksheets: qaChemicalSolutionControlWorksheets
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/worksheet/all/:status').get(function (req, res) {
    var _req$params = req === null || req === void 0 ? void 0 : req.params,
      status = _req$params.status;
    var qaChemicalSolutionControlWorksheets = [];
    _ChemicalSolutionControlWorksheet["default"].find().populate('revisedWorksheet').populate('creator').populate('records.creator').populate('records.verifier').lean().then(function (results) {
      if ((results === null || results === void 0 ? void 0 : results.length) > 0 && status === 'active') {
        return results.filter(function (item) {
          return (item === null || item === void 0 ? void 0 : item.revised) === false;
        });
      }
      if ((results === null || results === void 0 ? void 0 : results.length) > 0 && status === 'revised') {
        return results.filter(function (item) {
          return (item === null || item === void 0 ? void 0 : item.revised) === true;
        });
      }
      return [];
    }).then(function (results) {
      qaChemicalSolutionControlWorksheets = results.map(function (worksheet) {
        var _id = worksheet._id,
          __v = worksheet.__v,
          revised = worksheet.revised,
          creator = worksheet.creator,
          solutionTargetLimits = worksheet.solutionTargetLimits,
          solutionSpecificationReferences = worksheet.solutionSpecificationReferences,
          analysisSolutions = worksheet.analysisSolutions,
          records = worksheet.records,
          mappedWorksheet = _objectWithoutProperties(worksheet, _excluded3);
        mappedWorksheet.id = String(_id);
        mappedWorksheet.creationDateFormated = (0, _date.formatDateDmmyyyy)(mappedWorksheet === null || mappedWorksheet === void 0 ? void 0 : mappedWorksheet.creationDate);
        mappedWorksheet.revised = revised ? 'Revised' : 'Active';
        mappedWorksheet.creatorName = creator === null || creator === void 0 ? void 0 : creator.name;
        for (var i = 0; i < analysisSolutions.length; i++) {
          var e = analysisSolutions[i];
          delete e._id;
        }
        mappedWorksheet.analysisSolutions = analysisSolutions;
        for (var _i4 = 0; _i4 < solutionSpecificationReferences.length; _i4++) {
          var _e4 = solutionSpecificationReferences[_i4];
          delete _e4._id;
        }
        mappedWorksheet.solutionSpecificationReferences = solutionSpecificationReferences;
        for (var _i5 = 0; _i5 < solutionTargetLimits.length; _i5++) {
          var _e5 = solutionTargetLimits[_i5];
          delete _e5._id;
        }
        mappedWorksheet.solutionTargetLimits = solutionTargetLimits;
        mappedWorksheet.records = [];
        for (var _i6 = 0; _i6 < records.length; _i6++) {
          var _records$_i2 = records[_i6],
            _id3 = _records$_i2._id,
            _v2 = _records$_i2.__v,
            _creator2 = _records$_i2.creator,
            verifier = _records$_i2.verifier,
            _e6 = _objectWithoutProperties(_records$_i2, _excluded4);
          _e6.id = _id3;
          _e6.creatorName = _creator2 === null || _creator2 === void 0 ? void 0 : _creator2.name;
          _e6.verifierName = verifier === null || verifier === void 0 ? void 0 : verifier.name;
          _e6.sampleTakenDateFormated = (0, _date.formatDateDmmyyyy)(_e6 === null || _e6 === void 0 ? void 0 : _e6.sampleTakenDate);
          _e6.sampleAnalysisDateFormated = (0, _date.formatDateDmmyyyy)(_e6 === null || _e6 === void 0 ? void 0 : _e6.sampleAnalysisDate);
          _e6.chemicalChargingRecordReceivedDateFormated = (0, _date.formatDateDmmyyyy)(_e6 === null || _e6 === void 0 ? void 0 : _e6.chemicalChargingRecordReceivedDate);
          mappedWorksheet.records.push(_e6);
        }
        mappedWorksheet.records.sort(function (a, b) {
          return (b === null || b === void 0 ? void 0 : b.sampleTakenDate) - (a === null || a === void 0 ? void 0 : a.sampleTakenDate);
        });
        return mappedWorksheet;
      }).sort(function (a, b) {
        return a.solutionProcess.localeCompare(b.solutionProcess);
      });
      return res.status(200).json({
        success: true,
        message: null,
        data: {
          qaChemicalSolutionControlWorksheets: qaChemicalSolutionControlWorksheets
        }
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/worksheet/create').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    new _ChemicalSolutionControlWorksheet["default"](req === null || req === void 0 ? void 0 : req.body).save().then(function (result) {
      io.sockets.emit('chemical_solution_data_updated');
      return res.status(201).json({
        success: !!result,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/worksheet/edit/:ChemicalSolutionControlWorksheetId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    var _ref = params !== null && params !== void 0 ? params : {},
      ChemicalSolutionControlWorksheetId = _ref.ChemicalSolutionControlWorksheetId;
    _ChemicalSolutionControlWorksheet["default"].findOne({
      _id: ChemicalSolutionControlWorksheetId
    }).then(function (result) {
      var _result$records;
      if ((result === null || result === void 0 || (_result$records = result.records) === null || _result$records === void 0 ? void 0 : _result$records.length) > 0) {
        body.creationDate = result === null || result === void 0 ? void 0 : result.creationDate;
        body.records = result === null || result === void 0 ? void 0 : result.records;
        return _ChemicalSolutionControlWorksheet["default"].updateOne({
          _id: ChemicalSolutionControlWorksheetId
        }, body);
      } else {
        body.creationDate = Date.now();
        return _ChemicalSolutionControlWorksheet["default"].updateOne({
          _id: ChemicalSolutionControlWorksheetId
        }, body);
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_control_data_updated');
      return res.status(200).json({
        success: result.nModified === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/worksheet/delete/:ChemicalSolutionControlWorksheetId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    _ChemicalSolutionControlWorksheet["default"].findOne({
      _id: body === null || body === void 0 ? void 0 : body.revisedWorksheet
    }).then(function (result) {
      if (result) {
        return _ChemicalSolutionControlWorksheet["default"].updateOne({
          _id: result._id
        }, {
          revised: false
        });
      }
      return result;
    }).then(function () {
      return _ChemicalSolutionControlWorksheet["default"].deleteOne({
        _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId
      });
    }).then(function (result) {
      io.sockets.emit('chemical_solution_control_data_updated');
      return res.status(200).json({
        success: result.deletedCount === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/worksheet/revise/:ChemicalSolutionControlWorksheetId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    body.creationDate = Date.now();
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId
    }, {
      revised: true
    }).then(function (result) {
      if (!result.nModified === 1) {
        return res.status(200).json({
          success: false,
          message: 'Revise chemical solution control worksheet error.',
          data: null
        });
      }
      return new _ChemicalSolutionControlWorksheet["default"](body).save();
    }).then(function (result) {
      io.sockets.emit('chemical_solution_control_data_updated');
      return res.status(201).json({
        success: !!result,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/record/create/:ChemicalSolutionControlWorksheetId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId
    }, {
      $push: {
        records: body
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_data_updated');
      return res.status(201).json({
        success: result.nModified === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/record/edit/:ChemicalSolutionControlWorksheetId/:recordId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId,
      'records._id': "".concat(params === null || params === void 0 ? void 0 : params.recordId)
    }, {
      $set: {
        'records.$': body
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_data_updated');
      return res.status(200).json({
        success: result.nModified === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/record/delete/:ChemicalSolutionControlWorksheetId/:recordId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params;
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId
    }, {
      $pull: {
        records: {
          _id: "".concat(params === null || params === void 0 ? void 0 : params.recordId)
        }
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_control_data_updated');
      return res.status(200).json({
        success: (result === null || result === void 0 ? void 0 : result.nModified) === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/record/verify/:ChemicalSolutionControlWorksheetId/:recordId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId,
      'records._id': "".concat(params === null || params === void 0 ? void 0 : params.recordId)
    }, {
      $set: {
        'records.$.verifier': body === null || body === void 0 ? void 0 : body.verifier,
        'records.$.verificationDate': Date.now(),
        'records.$.result': body === null || body === void 0 ? void 0 : body.result
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_data_updated');
      return res.status(200).json({
        success: result.nModified === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  router.route('/record/ccr/:ChemicalSolutionControlWorksheetId/:recordId').post(_io.chemicalSolutionControlUpload.single('file'), function (req, res) {
    var params = req.params,
      body = req.body;
    _ChemicalSolutionControlWorksheet["default"].updateOne({
      _id: params === null || params === void 0 ? void 0 : params.ChemicalSolutionControlWorksheetId,
      'records._id': "".concat(params === null || params === void 0 ? void 0 : params.recordId)
    }, {
      $set: {
        'records.$.chemicalChargingRecordNumber': body === null || body === void 0 ? void 0 : body.chemicalChargingRecordNumber,
        'records.$.chemicalChargingRecordReceivedDate': body === null || body === void 0 ? void 0 : body.chemicalChargingRecordReceivedDate
      }
    }).then(function (result) {
      io.sockets.emit('chemical_solution_data_updated');
      return res.status(200).json({
        success: result.nModified === 1,
        message: null,
        data: null
      });
    })["catch"](function (err) {
      (0, _log.log)(err);
      res.status(500).json(err);
    });
  });
  return router;
};