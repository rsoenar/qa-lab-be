"use strict";

var _jsonwebtoken = require("jsonwebtoken");
var _common = require("../config/common");
var createUserToken = function createUserToken(user) {
  var _id = user._id,
    createdAt = user.createdAt,
    newUser = user.newUser,
    nik = user.nik,
    username = user.username,
    name = user.name,
    organization = user.organization,
    iaeEmail = user.iaeEmail,
    phoneNo = user.phoneNo,
    authorization = user.authorization;
  return (0, _jsonwebtoken.sign)({
    id: _id,
    createdAt: createdAt,
    newUser: newUser,
    nik: nik,
    username: username,
    name: name,
    organization: organization,
    iaeEmail: iaeEmail,
    phoneNo: phoneNo,
    authorization: authorization
  }, _common.secretKey, {
    expiresIn: '4h'
  });
};
module.exports = {
  createUserToken: createUserToken
};