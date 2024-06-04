"use strict";

var _compression = _interopRequireDefault(require("compression"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _path = _interopRequireDefault(require("path"));
var _socket = require("socket.io");
var _http = require("http");
var _bodyParser = require("body-parser");
var _chemicalSolutionControls = _interopRequireDefault(require("./routes/api/qa/chemicalSolutionControls"));
var _controlOfElectroplatingAndChemicalProcesses = _interopRequireDefault(require("./routes/api/qa/controlOfElectroplatingAndChemicalProcesses"));
var _laboratoryTests = _interopRequireDefault(require("./routes/api/qa/laboratoryTests"));
var _medias = _interopRequireDefault(require("./routes/api/common/medias"));
var _users = _interopRequireDefault(require("./routes/api/common/users"));
var _usersAuthorizations = _interopRequireDefault(require("./routes/api/common/usersAuthorizations"));
var _errorManager = require("./utils/errors/errorManager");
var _mongoose2 = require("./handlers/mongoose");
var _websocket = require("./handlers/websocket");
var _log = require("./utils/log");
var _schedule = require("./utils/schedule");
var _mongoose3 = require("./config/mongoose");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable no-console */

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
var ws = new _socket.Server(server, _cors["default"]);

// Job schedulers
(0, _schedule.scheduleMongoDbBackup)();

// Settings
app.set('trust proxy', 1);

// Middleware
app.use((0, _cors["default"])());
app.use((0, _bodyParser.json)());
app.use((0, _helmet["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use((0, _compression["default"])());
app.use((0, _methodOverride["default"])('_method'));
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));

// Routes
app.use('/api/users', (0, _users["default"])(ws));
app.use('/api/users/authorizations', (0, _usersAuthorizations["default"])(ws));
app.use('/api/medias', (0, _medias["default"])(ws));
app.use('/api/qa/laboratory-tests', (0, _laboratoryTests["default"])(ws));
app.use('/api/qa/chemical-solution-controls', (0, _chemicalSolutionControls["default"])(ws));
app.use('/api/qa/control-of-electroplating-and-chemical-processes', (0, _controlOfElectroplatingAndChemicalProcesses["default"])(ws));

// Custom middleware
app.use(function (err, _req, res, _next) {
  if (err) {
    (0, _errorManager.handleError)(err, res);
  }
});

// Connect databases
_mongoose["default"].connect(_mongoose3.uri, _mongoose3.options)["catch"](function (error) {
  return (0, _log.log)(error);
});

// Handlers
(0, _mongoose2.handleMongooseConnection)(_mongoose["default"].connection);
(0, _websocket.handleWsConnection)(ws);

// Serve
server.listen(5000, function () {
  (0, _log.log)('IAe Server up and running on port 5000.');
});