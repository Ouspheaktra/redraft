"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Joins the input if the joinOutput option is enabled
 */
var checkJoin = function checkJoin(input, options) {
  if (Array.isArray(input) && options.joinOutput) {
    return input.join('');
  }

  return input;
};

var _default = checkJoin;
exports["default"] = _default;