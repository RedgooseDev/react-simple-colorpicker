"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var lib = _interopRequireWildcard(require("./lib"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Map =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    var _this;

    _classCallCheck(this, Map);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Map).call(this, props));
    _this.state = {
      active: false
    };
    _this._self = null;
    _this._rect = null;
    _this.onHandleUpdate = _this._onUpdate.bind(_assertThisInitialized(_this));
    _this.onStopUpdates = _this._onStopUpdates.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * update position
   *
   * @param {ClientRect} rect
   * @param {Number} clientX
   * @param {Number} clientY
   */


  _createClass(Map, [{
    key: "updatePosition",
    value: function updatePosition(rect, clientX, clientY) {
      var x = (clientX - rect.left) / rect.width;
      var y = (rect.bottom - clientY) / rect.height;
      this.props.onChange(this.getScaledValue(x), this.getScaledValue(y));
    }
    /**
     * get scaled value
     *
     * @param {Number} value
     */

  }, {
    key: "getScaledValue",
    value: function getScaledValue(value) {
      return lib.util.clamp(value, 0, 1) * this.props.max;
    }
    /**
     * get percentage value
     *
     * @param {Number} value
     * @return {String}
     */

  }, {
    key: "getPercentageValue",
    value: function getPercentageValue(value) {
      return "".concat(value / this.props.max * 100, "%");
    }
    /**
     * get position
     *
     * @param {Event} e
     */

  }, {
    key: "getPosition",
    value: function getPosition(e) {
      if (e.touches) {
        e = e.touches[0];
      }

      return {
        x: e.clientX,
        y: e.clientY
      };
    }
    /**
     * get bounding rect
     *
     * @return {ClientRect}
     */

  }, {
    key: "getBoundingRect",
    value: function getBoundingRect() {
      return _reactDom["default"].findDOMNode(this._self).getBoundingClientRect();
    }
    /**
     * on start updates
     *
     * @param {Event} e
     */

  }, {
    key: "_onStartUpdates",
    value: function _onStartUpdates(e) {
      e.preventDefault(); // set x,y position

      var _this$getPosition = this.getPosition(e),
          x = _this$getPosition.x,
          y = _this$getPosition.y; // set element


      this._rect = this.getBoundingRect(); // set mouse|touch event

      document.addEventListener('mousemove', this.onHandleUpdate);
      document.addEventListener('touchmove', this.onHandleUpdate);
      document.addEventListener('mouseup', this.onStopUpdates);
      document.addEventListener('touchend', this.onStopUpdates);
      this.setState({
        active: true
      });
      this.updatePosition(this._rect, x, y);
    }
    /**
     * on stop updates
     */

  }, {
    key: "_onStopUpdates",
    value: function _onStopUpdates() {
      // unset mouse|touch event
      document.removeEventListener("mousemove", this.onHandleUpdate);
      document.removeEventListener("touchmove", this.onHandleUpdate);
      document.removeEventListener("mouseup", this.onStopUpdates);
      document.removeEventListener("touchend", this.onStopUpdates);
      this.setState({
        active: false
      });
    }
    /**
     * on update
     *
     * @param {Event} e
     */

  }, {
    key: "_onUpdate",
    value: function _onUpdate(e) {
      e.preventDefault();

      var _this$getPosition2 = this.getPosition(e),
          x = _this$getPosition2.x,
          y = _this$getPosition2.y;

      this.updatePosition(this._rect, x, y);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state,
          props = this.props;
      return _react["default"].createElement("div", {
        ref: function ref(r) {
          _this2._self = r;
        },
        onMouseDown: this._onStartUpdates.bind(this),
        onTouchStart: this._onStartUpdates.bind(this),
        className: (0, _classnames["default"])('cpMap', props.className, {
          'cpMap-active': state.active
        })
      }, _react["default"].createElement("div", {
        className: "cpMap__background",
        style: {
          backgroundColor: props.backgroundColor
        }
      }), _react["default"].createElement("div", {
        className: "cpMap__pointer",
        style: {
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        }
      }));
    }
  }]);

  return Map;
}(_react["default"].Component);

Map.propTypes = {
  x: _propTypes["default"].number.isRequired,
  y: _propTypes["default"].number.isRequired,
  backgroundColor: _propTypes["default"].string,
  className: _propTypes["default"].string
};
Map.defaultProps = {
  x: 0,
  y: 0,
  backgroundColor: "transparent",
  className: null
};
var _default = Map;
exports["default"] = _default;