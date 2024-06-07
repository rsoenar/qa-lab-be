"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  newUser: {
    type: Boolean,
    "default": true
  },
  nik: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    trim: true,
    "default": undefined
  },
  birthDate: {
    type: Date,
    "default": undefined
  },
  gender: {
    type: String,
    trim: true,
    "default": undefined
  },
  education: {
    type: String,
    trim: true,
    "default": undefined
  },
  major: {
    type: String,
    trim: true,
    "default": undefined
  },
  organization: {
    type: String,
    trim: true,
    "default": undefined
  },
  duty: {
    type: String,
    trim: true,
    "default": undefined
  },
  iaeEmail: {
    type: String,
    trim: true,
    "default": undefined
  },
  phoneNo: {
    type: String,
    trim: true,
    "default": undefined
  },
  location: {
    type: String,
    trim: true,
    "default": undefined
  },
  authorization: {
    type: Schema.Types.ObjectId,
    ref: 'users.authorizations'
  }
}, {
  timestamps: true
});
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
UserSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = exports["default"] = _mongoose["default"].model('users', UserSchema);