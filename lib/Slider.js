'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lib = require('./lib');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_React$Component) {
	_inherits(Slider, _React$Component);

	function Slider(props) {
		_classCallCheck(this, Slider);

		var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

		_this._self = null;
		_this.rect = null;
		_this.onHandleUpdate = _this._onUpdate.bind(_this);
		_this.onStopUpdates = _this._onStopUpdates.bind(_this);
		return _this;
	}

	/**
  * get position
  *
  * @param {Event} e
  */


	_createClass(Slider, [{
		key: 'getPosition',
		value: function getPosition(e) {
			if (e.touches) {
				e = e.touches[0];
			}
			return { x: e.clientX, y: e.clientY };
		}

		/**
   * get percentage value
   *
   * @param {Number} value
   * @return {String}
   */

	}, {
		key: 'getPercentageValue',
		value: function getPercentageValue(value) {
			return value / this.props.max * 100 + '%';
		}

		/**
   * update position
   *
   * @param {ClientRect} rect
   * @param {Number} clientX
   */

	}, {
		key: 'updatePosition',
		value: function updatePosition(rect, clientX) {
			this.props.onChange(this.getScaledValue((clientX - rect.left) / rect.width));
		}

		/**
   * get scaled value
   *
   * @param {Number} value
   */

	}, {
		key: 'getScaledValue',
		value: function getScaledValue(value) {
			return lib.util.clamp(value, 0, 1) * this.props.max;
		}

		/**
   * get bounding rect
   *
   * @return {ClientRect}
   */

	}, {
		key: 'getBoundingRect',
		value: function getBoundingRect() {
			return _reactDom2.default.findDOMNode(this._self).getBoundingClientRect();
		}

		/**
   * on start updates
   *
   * @param {Event} e
   */

	}, {
		key: '_onStartUpdates',
		value: function _onStartUpdates(e) {
			e.preventDefault();

			// set x,y position

			var _getPosition = this.getPosition(e),
			    x = _getPosition.x;

			// set element


			this._rect = this.getBoundingRect();

			document.addEventListener('mousemove', this.onHandleUpdate);
			document.addEventListener('touchmove', this.onHandleUpdate);
			document.addEventListener('mouseup', this.onStopUpdates);
			document.addEventListener('touchend', this.onStopUpdates);

			this.setState({ active: true });
			this.updatePosition(this._rect, x);
		}

		/**
   * on stop updates
   */

	}, {
		key: '_onStopUpdates',
		value: function _onStopUpdates() {
			document.removeEventListener("mousemove", this.onHandleUpdate);
			document.removeEventListener("touchmove", this.onHandleUpdate);
			document.removeEventListener("mouseup", this.onStopUpdates);
			document.removeEventListener("touchend", this.onStopUpdates);

			this.setState({ active: false });
		}

		/**
   * on update
   *
   * @param {Event} e
   */

	}, {
		key: '_onUpdate',
		value: function _onUpdate(e) {
			e.preventDefault();

			var _getPosition2 = this.getPosition(e),
			    x = _getPosition2.x;

			this.updatePosition(this._rect, x);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;


			return _react2.default.createElement(
				'div',
				{
					ref: function ref(r) {
						_this2._self = r;
					},
					className: (0, _classnames2.default)('cpSlider', props.className),
					onMouseDown: this._onStartUpdates.bind(this),
					onTouchStart: this._onStartUpdates.bind(this) },
				_react2.default.createElement(
					'div',
					{ className: 'cpSlider__track' },
					_react2.default.createElement('span', { style: { background: props.background } })
				),
				_react2.default.createElement('div', {
					className: 'cpSlider__pointer',
					style: { left: this.getPercentageValue(this.props.value) } })
			);
		}
	}]);

	return Slider;
}(_react2.default.Component);

Slider.propTypes = {
	value: _propTypes2.default.number.isRequired,
	background: _propTypes2.default.string
};
Slider.defaultProps = {
	value: 0,
	background: '',
	className: null
};
exports.default = Slider;