"use strict";

var uri = 'mongodb://localhost:27017/iae_server';
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 10
};
module.exports = {
  uri: uri,
  options: options
};