"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This is a simple replacement for draft-js ContentBlock,
 * CharacterList or any related methods are not implented here
 */
var ContentBlockStub =
/*#__PURE__*/
function () {
  function ContentBlockStub(block) {
    _classCallCheck(this, ContentBlockStub);

    Object.assign(this, block);
  }

  _createClass(ContentBlockStub, [{
    key: "get",
    value: function get(name) {
      return this[name];
    }
  }, {
    key: "getText",
    value: function getText() {
      return this.text;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.key;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return this.text.length;
    }
  }, {
    key: "getDepth",
    value: function getDepth() {
      return this.depth;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }]);

  return ContentBlockStub;
}();

var stubContentBlock = function stubContentBlock(block) {
  return new ContentBlockStub(block);
};

var _default = stubContentBlock;
exports["default"] = _default;