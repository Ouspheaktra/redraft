"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KEY_SEPARATOR = '-';

var MultiDecorator =
/*#__PURE__*/
function () {
  function MultiDecorator(decorators) {
    _classCallCheck(this, MultiDecorator);

    this.decorators = decorators;
  }
  /**
   * Return list of decoration IDs per character
   *
   * @param {ContentBlock} block
   * @return {List<String>}
   */


  _createClass(MultiDecorator, [{
    key: "getDecorations",
    value: function getDecorations(block, contentState) {
      var decorations = new Array(block.getText().length).fill(null);
      this.decorators.forEach(function (decorator, i) {
        var subDecorations = decorator.getDecorations(block, contentState);
        subDecorations.forEach(function (key, offset) {
          if (!key) {
            return;
          }

          decorations[offset] = i + KEY_SEPARATOR + key;
        });
      });
      return decorations;
    }
    /**
     * Return component to render a decoration
     *
     * @param {String} key
     * @return {Function}
     */

  }, {
    key: "getComponentForKey",
    value: function getComponentForKey(key) {
      var decorator = this.getDecoratorForKey(key);
      return decorator.getComponentForKey(MultiDecorator.getInnerKey(key));
    }
    /**
     * Return props to render a decoration
     *
     * @param {String} key
     * @return {Object}
     */

  }, {
    key: "getPropsForKey",
    value: function getPropsForKey(key) {
      var decorator = this.getDecoratorForKey(key);
      return decorator.getPropsForKey(MultiDecorator.getInnerKey(key));
    }
    /**
     * Return a decorator for a specific key
     *
     * @param {String} key
     * @return {Decorator}
     */

  }, {
    key: "getDecoratorForKey",
    value: function getDecoratorForKey(key) {
      var parts = key.split(KEY_SEPARATOR);
      var index = Number(parts[0]);
      return this.decorators[index];
    }
    /**
     * Return inner key for a decorator
     *
     * @param {String} key
     * @return {String}
     */

  }], [{
    key: "getInnerKey",
    value: function getInnerKey(key) {
      var parts = key.split(KEY_SEPARATOR);
      return parts.slice(1).join(KEY_SEPARATOR);
    }
  }]);

  return MultiDecorator;
}();

var _default = MultiDecorator;
exports["default"] = _default;