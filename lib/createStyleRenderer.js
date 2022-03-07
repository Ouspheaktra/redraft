"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Returns a single style object provided styleArray and stylesMap
 */
var reduceStyles = function reduceStyles(styleArray, stylesMap) {
  return styleArray.map(function (style) {
    return stylesMap[style];
  }).reduce(function (prev, next) {
    var mergedStyles = {};

    if (next !== undefined) {
      var key = 'text-decoration' in next ? 'text-decoration' : 'textDecoration';

      if (next[key] !== prev[key]) {
        // .trim() is necessary for IE9/10/11 and Edge
        mergedStyles[key] = [prev[key], next[key]].join(' ').trim();
      }
    }

    return Object.assign(prev, next, mergedStyles);
  }, {});
};
/**
 * Returns a styleRenderer from a customStyleMap and a wrapper callback (Component)
 */


var createStyleRenderer = function createStyleRenderer(wrapper, stylesMap) {
  return function (children, styleArray, params) {
    var style = reduceStyles(styleArray, stylesMap);
    return wrapper(Object.assign({}, {
      children: children
    }, params, {
      style: style
    }));
  };
};

var _default = createStyleRenderer;
exports["default"] = _default;