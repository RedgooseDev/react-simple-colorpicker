"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Slider = _interopRequireDefault(require("./Slider"));

var _Map = _interopRequireDefault(require("./Map"));

var _Palette = _interopRequireDefault(require("./Palette"));

var lib = _interopRequireWildcard(require("./lib"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ColorPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorPicker).call(this, props));
    _this.state = {
      color: lib.color.parseToHsv(props.color)
    };
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var state = this.state;
      var nextColor = lib.color.parseToHsv(nextProps.color);

      if (!lib.color.equals(state.color, nextColor)) {
        this.setState({
          color: nextColor
        });
      }
    }
    /**
     * get alpha
     *
     * @return {Number}
     */

  }, {
    key: "getAlpha",
    value: function getAlpha() {
      var state = this.state;
      return state.color[3] === undefined ? 1 : state.color[3];
    }
    /**
     * get background gradient
     *
     * @return {String}
     */

  }, {
    key: "getBackgroundGradient",
    value: function getBackgroundGradient() {
      var _this$state$color = _slicedToArray(this.state.color, 3),
          h = _this$state$color[0],
          s = _this$state$color[1],
          v = _this$state$color[2];

      var opaque = lib.color.toRgbString([h, s, v, 1]);
      return "linear-gradient(to right, rgba(0,0,0,0) 0%, ".concat(opaque, " 100%)");
    }
    /**
     * get background hue
     *
     * @return {String}
     */

  }, {
    key: "getBackgroundHue",
    value: function getBackgroundHue() {
      return lib.color.toRgbString([this.state.color[0], 100, 100]);
    }
    /**
     * update
     *
     * @param {Array} c hue type color
     */

  }, {
    key: "update",
    value: function update(c) {
      var props = this.props;
      this.setState({
        color: c
      });
      props.onChange(lib.color.toRgbString(c));
    }
    /**
     * Change color
     *
     * @param {String} color - hex color
     */

  }, {
    key: "changeColor",
    value: function changeColor(color) {
      var nextColor = lib.color.parseToHsv(color);

      if (!lib.color.equals(this.state.color, nextColor)) {
        this.setState({
          color: nextColor
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state,
          props = this.props;

      var _state$color = _slicedToArray(state.color, 3),
          hue = _state$color[0],
          saturation = _state$color[1],
          value = _state$color[2];

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])('colorpicker', props.className)
      }, _react["default"].createElement(_Map["default"], {
        x: saturation,
        y: value,
        max: 100,
        backgroundColor: this.getBackgroundHue(),
        onChange: function onChange(saturation, value) {
          var _state$color2 = _slicedToArray(state.color, 4),
              h = _state$color2[0],
              a = _state$color2[3];

          _this2.update([h, saturation, value, a]);
        },
        className: (0, _classnames["default"])('colorpicker__map', {
          'cpMap-dark': lib.color.isDark(state.color),
          'cpMap-light': !lib.color.isDark(state.color)
        })
      }), _react["default"].createElement("div", {
        className: "colorpicker__body"
      }, _react["default"].createElement("nav", {
        className: "colorpicker__controller"
      }, _react["default"].createElement(_Slider["default"], {
        value: hue,
        max: 360,
        onChange: function onChange(hue) {
          var _state$color3 = _slicedToArray(state.color, 4),
              s = _state$color3[1],
              v = _state$color3[2],
              a = _state$color3[3];

          _this2.update([hue, s, v, a]);
        },
        className: "colorpicker__slider cpSlider-hue"
      }), _react["default"].createElement(_Slider["default"], {
        value: this.getAlpha(),
        max: 1,
        background: this.getBackgroundGradient(),
        onChange: function onChange(alpha) {
          var _state$color4 = _slicedToArray(state.color, 3),
              h = _state$color4[0],
              s = _state$color4[1],
              v = _state$color4[2];

          _this2.update([h, s, v, alpha]);
        },
        className: "colorpicker__slider cpSlider-opacity"
      })), _react["default"].createElement("figure", {
        className: "cpPreview colorpicker__preview"
      }, _react["default"].createElement("span", null, _react["default"].createElement("i", {
        style: {
          backgroundColor: lib.color.toRgbString(state.color)
        }
      })))), _react["default"].createElement(_Palette["default"], {
        colors: props.paletteColors,
        onSelectColor: function onSelectColor(color) {
          var _lib$color$parseToHsv = lib.color.parseToHsv(color),
              _lib$color$parseToHsv2 = _slicedToArray(_lib$color$parseToHsv, 4),
              h = _lib$color$parseToHsv2[0],
              saturation = _lib$color$parseToHsv2[1],
              value = _lib$color$parseToHsv2[2],
              a = _lib$color$parseToHsv2[3];

          _this2.update([h, saturation, value, a]);
        },
        className: "colorpicker__palette"
      }));
    }
  }]);

  return ColorPicker;
}(_react["default"].Component);

ColorPicker.propTypes = {
  color: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func.isRequired
};
ColorPicker.defaultProps = {
  color: "rgba(0,0,0,1)",
  onChange: function onChange(color) {},
  paletteColors: ['#D0011B', '#F6A623', '#F8E81C', '#8B572A', '#7ED321', '#417505', '#BD0FE1', '#9012FE', '#4990E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', '#B31F37'],
  className: null
};
var _default = ColorPicker;
exports["default"] = _default;