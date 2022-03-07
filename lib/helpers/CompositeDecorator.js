"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is only slighly modified version of draft-js CompositeDraftDecorator
 * https://github.com/facebook/draft-js/blob/dc27624caaaede4dad9d182ff9918a5da8f83c99/src/model/decorators/CompositeDraftDecorator.js
 *
 * Basicly it just swaps the Immutable.js List with own ListStub
 *
 * 
 */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
var DELIMITER = '.';
/**
 * Determine whether we can occupy the specified slice of the decorations
 * array.
 */

function canOccupySlice(decorations, start, end) {
  // eslint-disable-next-line no-plusplus
  for (var ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }

  return true;
}
/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */


function occupySlice(targetArr, start, end, componentKey) {
  // eslint-disable-next-line no-plusplus
  for (var ii = start; ii < end; ii++) {
    // eslint-disable-next-line no-param-reassign
    targetArr[ii] = componentKey;
  }
}
/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */


var CompositeDraftDecorator =
/*#__PURE__*/
function () {
  function CompositeDraftDecorator(decorators) {
    _classCallCheck(this, CompositeDraftDecorator);

    _defineProperty(this, "decorators", void 0);

    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this.decorators = decorators.slice();
  }

  _createClass(CompositeDraftDecorator, [{
    key: "getDecorations",
    value: function getDecorations(block, contentState) {
      var decorations = Array(block.getText().length).fill(null);
      this.decorators.forEach(function (
      /* object */
      decorator,
      /* number */
      ii) {
        var counter = 0;
        var strategy = decorator.strategy;

        var callback = function callback(
        /* number */
        start,
        /* number */
        end) {
          // Find out if any of our matching range is already occupied
          // by another decorator. If so, discard the match. Otherwise, store
          // the component key for rendering.
          if (canOccupySlice(decorations, start, end)) {
            occupySlice(decorations, start, end, ii + DELIMITER + counter); // eslint-disable-next-line no-plusplus

            counter++;
          }
        };

        strategy(block, callback, contentState);
      });
      return decorations;
    }
  }, {
    key: "getComponentForKey",
    value: function getComponentForKey(key) {
      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
      return this.decorators[componentKey].component;
    }
  }, {
    key: "getPropsForKey",
    value: function getPropsForKey(key) {
      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
      return this.decorators[componentKey].props;
    }
  }]);

  return CompositeDraftDecorator;
}();

var _default = CompositeDraftDecorator;
exports["default"] = _default;