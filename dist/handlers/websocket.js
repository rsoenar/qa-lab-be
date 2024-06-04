"use strict";

function handleWsConnection(ws) {
  ws.on('connection', function (socket) {
    var id = socket.id;
    log("Client ".concat(id, " is connected."));
    socket.on('disconnect', function (reason) {
      log("Client ".concat(id, " is disconnected. Reason: ").concat(reason, "."));
    });
  });
}
module.exports = {
  handleWsConnection: handleWsConnection
};