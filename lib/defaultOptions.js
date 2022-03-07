"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var defaultOptions = {
  joinOutput: false,
  cleanup: {
    after: ['atomic'],
    types: ['unstyled'],
    trim: false,
    split: true
  },
  blockFallback: 'unstyled'
};
var _default = defaultOptions;
exports["default"] = _default;