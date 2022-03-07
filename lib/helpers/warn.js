"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Logs a warning message if not in production
 */
var warn = function warn(msg) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn("Redraft: ".concat(msg)); // eslint-disable-line no-console
  }
};

var _default = warn;
exports["default"] = _default;