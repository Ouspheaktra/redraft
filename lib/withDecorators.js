"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _punycode = _interopRequireDefault(require("punycode"));

var _CompositeDecorator = _interopRequireDefault(require("./helpers/CompositeDecorator"));

var _MultiDecorator = _interopRequireDefault(require("./helpers/MultiDecorator"));

var _stubContentBlock = _interopRequireDefault(require("./helpers/stubContentBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Use CompositeDecorator to build decoratorRanges with ranges, components, and props
 */
// This offsets or rather recalculates ranges for decorators
// with punycode.ucs2.decode
var offsetRanges = function offsetRanges(ranges, block) {
  // if there are no decorator skip this step
  ranges.forEach(function (range) {
    var pre = block.text.substring(0, range.offset);
    var decorated = block.text.substring(range.offset, range.offset + range.length); // eslint-disable-next-line no-param-reassign

    range.offset = _punycode["default"].ucs2.decode(pre).length; // eslint-disable-next-line no-param-reassign

    range.length = _punycode["default"].ucs2.decode(decorated).length;
  });
  return ranges;
}; // Return true if decorator implements the DraftDecoratorType interface
// @see https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js


var decoratorIsCustom = function decoratorIsCustom(decorator) {
  return typeof decorator.getDecorations === 'function' && typeof decorator.getComponentForKey === 'function' && typeof decorator.getPropsForKey === 'function';
};

var resolveDecorators = function resolveDecorators(decorators) {
  var compositeDecorator = new _CompositeDecorator["default"](decorators.filter(function (decorator) {
    return !decoratorIsCustom(decorator);
  }));
  var customDecorators = decorators.filter(function (decorator) {
    return decoratorIsCustom(decorator);
  });
  var decor = [].concat(_toConsumableArray(customDecorators), [compositeDecorator]);
  return new _MultiDecorator["default"](decor);
};

var decorateBlock = function decorateBlock(block, decorators, contentState, _ref) {
  var createContentBlock = _ref.createContentBlock;
  var decoratorRanges = []; // create a Decorator instance

  var decorator = resolveDecorators(decorators); // create ContentBlock or a stub

  var contentBlock = createContentBlock ? createContentBlock(block) : (0, _stubContentBlock["default"])(block); // Get decorations from CompositeDecorator instance

  var decorations = decorator.getDecorations(contentBlock, contentState); // Keep track of offset for current key

  var offset = 0;
  decorations.forEach(function (key, index) {
    // If no key just move the offset
    if (!key) {
      offset += 1;
      return;
    } // get next key


    var nextIndex = index + 1;
    var next = decorations[nextIndex]; // if thers no next key or the key chages build a decoratorRange entry

    if (!next || next !== key) {
      decoratorRanges.push({
        offset: offset,
        length: nextIndex - offset,
        component: decorator.getComponentForKey(key),
        decoratorProps: decorator.getPropsForKey(key) || {},
        // save reference to contentState
        contentState: contentState
      }); // reset the offset to next index

      offset = nextIndex;
    }
  }); // merge the block with decoratorRanges

  return Object.assign({}, block, {
    decoratorRanges: offsetRanges(decoratorRanges, block)
  });
};

var withDecorators = function withDecorators(raw, decorators, options) {
  var contentState = options.convertFromRaw && options.convertFromRaw(raw);
  return raw.blocks.map(function (block) {
    return decorateBlock(block, decorators, contentState, options || {});
  });
};

var _default = withDecorators;
exports["default"] = _default;