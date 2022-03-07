"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var KEY_DELIMITER = ','; // Return either a single key if present or joined keys array from props;

var getKey = function getKey(_ref, key) {
  var keys = _ref.keys;

  if (key) {
    return key;
  }

  if (!keys) {
    return undefined;
  }

  return keys.join(KEY_DELIMITER);
}; // Call the wrapper with element, props, and spread children
// this order is specific to React.createElement


var getBlock = function getBlock(element, wrapper) {
  return function (children, properties, key) {
    var props = Object.assign({}, properties);
    var blockKey = getKey(props, key);
    delete props.depth;
    delete props.keys;
    return wrapper.apply(void 0, [element, Object.assign({}, props, {
      key: blockKey
    })].concat(_toConsumableArray(children)));
  };
}; // Handle blocks with wrapper element defined


var getWrappedChildren = function getWrappedChildren(callback, block, _ref2) {
  var children = _ref2.children,
      props = _ref2.props,
      key = _ref2.key;
  var wrapperBlockFn = getBlock(block.wrapper, callback);
  var blockFn = getBlock(block.element, callback, true);
  return wrapperBlockFn(children.map(function (child, ii) {
    return blockFn(child, {
      depth: props.depth
    }, props.keys && props.keys[ii]);
  }), props, key);
};
/**
* Returns a blockRenderer crated from a blockRendererMap using a callback ie. React.createElement
*/


var createBlockRenderer = function createBlockRenderer(callback, blockMap) {
  var renderer = {};
  Object.keys(blockMap).forEach(function (item) {
    var block = blockMap[item]; // If wrapper is present children need to be nested inside

    if (block.wrapper) {
      renderer[item] = function (children, props, key) {
        return getWrappedChildren(callback, block, {
          children: children,
          props: props,
          key: key
        });
      };

      return;
    } // Wrapper is not present


    renderer[item] = getBlock(block.element, callback);
  });
  return renderer;
};

var _default = createBlockRenderer;
exports["default"] = _default;