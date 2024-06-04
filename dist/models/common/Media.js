"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var MediaSchema = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    "default": null
  },
  fileName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    trim: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: [String],
    trim: true,
    "default": undefined
  },
  viewCount: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
MediaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
MediaSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
MediaSchema.set('toObject', {
  virtuals: true,
  transform: function transform(_doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});
var _default = exports["default"] = _mongoose["default"].model('medias', MediaSchema);