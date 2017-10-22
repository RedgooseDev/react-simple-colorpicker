'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Palette = require('./Palette');

var _Palette2 = _interopRequireDefault(_Palette);

var _lib = require('./lib');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_React$Component) {
	_inherits(ColorPicker, _React$Component);

	function ColorPicker(props) {
		_classCallCheck(this, ColorPicker);

		var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this));

		_this.state = {
			color: lib.color.parseToHsv(props.color)
		};
		return _this;
	}

	_createClass(ColorPicker, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var state = this.state;

			var nextColor = lib.color.parseToHsv(nextProps.color);

			if (!lib.color.equals(state.color, nextColor)) {
				this.setState({ color: nextColor });
			}
		}

		/**
   * get alpha
   *
   * @return {Number}
   */

	}, {
		key: 'getAlpha',
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
		key: 'getBackgroundGradient',
		value: function getBackgroundGradient() {
			var _state$color = _slicedToArray(this.state.color, 3),
			    h = _state$color[0],
			    s = _state$color[1],
			    v = _state$color[2];

			var opaque = lib.color.toRgbString([h, s, v, 1]);
			return 'linear-gradient(to right, rgba(0,0,0,0) 0%, ' + opaque + ' 100%)';
		}

		/**
   * get background hue
   *
   * @return {String}
   */

	}, {
		key: 'getBackgroundHue',
		value: function getBackgroundHue() {
			return lib.color.toRgbString([this.state.color[0], 100, 100]);
		}

		/**
   * update
   *
   * @param {Array} c hue type color
   */

	}, {
		key: 'update',
		value: function update(c) {
			var props = this.props;

			this.setState({ color: c });
			props.onChange(lib.color.toRgbString(c));
		}

		/**
   * Change color
   *
   * @param {String} color - hex color
   */

	}, {
		key: 'changeColor',
		value: function changeColor(color) {
			var nextColor = lib.color.parseToHsv(color);

			if (!lib.color.equals(this.state.color, nextColor)) {
				this.setState({ color: nextColor });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var state = this.state,
			    props = this.props;

			var _state$color2 = _slicedToArray(state.color, 3),
			    hue = _state$color2[0],
			    saturation = _state$color2[1],
			    value = _state$color2[2];

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('colorpicker', props.className) },
				_react2.default.createElement(_Map2.default, {
					x: saturation,
					y: value,
					max: 100,
					backgroundColor: this.getBackgroundHue(),
					onChange: function onChange(saturation, value) {
						var _state$color3 = _slicedToArray(state.color, 4),
						    h = _state$color3[0],
						    a = _state$color3[3];

						_this2.update([h, saturation, value, a]);
					},
					className: (0, _classnames2.default)('colorpicker__map', {
						'cpMap-dark': lib.color.isDark(state.color),
						'cpMap-light': !lib.color.isDark(state.color)
					}) }),
				_react2.default.createElement(
					'div',
					{ className: 'colorpicker__body' },
					_react2.default.createElement(
						'nav',
						{ className: 'colorpicker__controller' },
						_react2.default.createElement(_Slider2.default, {
							value: hue,
							max: 360,
							onChange: function onChange(hue) {
								var _state$color4 = _slicedToArray(state.color, 4),
								    s = _state$color4[1],
								    v = _state$color4[2],
								    a = _state$color4[3];

								_this2.update([hue, s, v, a]);
							},
							className: 'colorpicker__slider cpSlider-hue' }),
						_react2.default.createElement(_Slider2.default, {
							value: this.getAlpha(),
							max: 1,
							background: this.getBackgroundGradient(),
							onChange: function onChange(alpha) {
								var _state$color5 = _slicedToArray(state.color, 3),
								    h = _state$color5[0],
								    s = _state$color5[1],
								    v = _state$color5[2];

								_this2.update([h, s, v, alpha]);
							},
							className: 'colorpicker__slider cpSlider-opacity' })
					),
					_react2.default.createElement(
						'figure',
						{ className: 'cpPreview colorpicker__preview' },
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement('i', { style: { backgroundColor: lib.color.toRgbString(state.color) } })
						)
					)
				),
				_react2.default.createElement(_Palette2.default, {
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
					className: 'colorpicker__palette' })
			);
		}
	}]);

	return ColorPicker;
}(_react2.default.Component);

ColorPicker.propTypes = {
	color: _propTypes2.default.string.isRequired,
	onChange: _propTypes2.default.func.isRequired
};
ColorPicker.defaultProps = {
	color: "rgba(0,0,0,1)",
	onChange: function onChange(color) {},
	paletteColors: ['#D0011B', '#F6A623', '#F8E81C', '#8B572A', '#7ED321', '#417505', '#BD0FE1', '#9012FE', '#4990E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', '#B31F37'],
	className: null
};
exports.default = ColorPicker;