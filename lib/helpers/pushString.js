"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Concats or insets a string at given array index
 */
var pushString = function pushString(string, array, index) {
  var tempArray = array;

  if (!array[index]) {
    tempArray[index] = string;
  } else {
    tempArray[index] += string;
  }

  return tempArray;
};

var _default = pushString;
exports["default"] = _default;