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

var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));
    _this._self = null;
    _this.rect = null;
    _this.onHandleUpdate = _this._onUpdate.bind(_assertThisInitialized(_this));
    _this.onStopUpdates = _this._onStopUpdates.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * get position
   *
   * @param {Event} e
   */


  _createClass(Slider, [{
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
     * update position
     *
     * @param {ClientRect} rect
     * @param {Number} clientX
     */

  }, {
    key: "updatePosition",
    value: function updatePosition(rect, clientX) {
      this.props.onChange(this.getScaledValue((clientX - rect.left) / rect.width));
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
          x = _this$getPosition.x; // set element


      this._rect = this.getBoundingRect();
      document.addEventListener('mousemove', this.onHandleUpdate);
      document.addEventListener('touchmove', this.onHandleUpdate);
      document.addEventListener('mouseup', this.onStopUpdates);
      document.addEventListener('touchend', this.onStopUpdates);
      this.setState({
        active: true
      });
      this.updatePosition(this._rect, x);
    }
    /**
     * on stop updates
     */

  }, {
    key: "_onStopUpdates",
    value: function _onStopUpdates() {
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
          x = _this$getPosition2.x;

      this.updatePosition(this._rect, x);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return _react["default"].createElement("div", {
        ref: function ref(r) {
          _this2._self = r;
        },
        className: (0, _classnames["default"])('cpSlider', props.className),
        onMouseDown: this._onStartUpdates.bind(this),
        onTouchStart: this._onStartUpdates.bind(this)
      }, _react["default"].createElement("div", {
        className: "cpSlider__track"
      }, _react["default"].createElement("span", {
        style: {
          background: props.background
        }
      })), _react["default"].createElement("div", {
        className: "cpSlider__pointer",
        style: {
          left: this.getPercentageValue(this.props.value)
        }
      }));
    }
  }]);

  return Slider;
}(_react["default"].Component);

Slider.propTypes = {
  value: _propTypes["default"].number.isRequired,
  background: _propTypes["default"].string
};
Slider.defaultProps = {
  value: 0,
  background: '',
  className: null
};
var _default = Slider;
exports["default"] = _default;