"use strict";

function handleMongooseConnection(connection) {
  connection.on('error', function (err) {
    log(err);
  });
  connection.on('disconnected', function (err) {
    log(err);
  });
}
module.exports = {
  handleMongooseConnection: handleMongooseConnection
};