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

var Map = function (_React$Component) {
	_inherits(Map, _React$Component);

	function Map(props) {
		_classCallCheck(this, Map);

		var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

		_this.state = {
			active: false
		};

		_this._self = null;
		_this._rect = null;
		_this.onHandleUpdate = _this._onUpdate.bind(_this);
		_this.onStopUpdates = _this._onStopUpdates.bind(_this);
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
		key: 'updatePosition',
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
		key: 'getScaledValue',
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
		key: 'getPercentageValue',
		value: function getPercentageValue(value) {
			return value / this.props.max * 100 + '%';
		}

		/**
   * get position
   *
   * @param {Event} e
   */

	}, {
		key: 'getPosition',
		value: function getPosition(e) {
			if (e.touches) {
				e = e.touches[0];
			}
			return { x: e.clientX, y: e.clientY };
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
			    x = _getPosition.x,
			    y = _getPosition.y;

			// set element


			this._rect = this.getBoundingRect();

			// set mouse|touch event
			document.addEventListener('mousemove', this.onHandleUpdate);
			document.addEventListener('touchmove', this.onHandleUpdate);
			document.addEventListener('mouseup', this.onStopUpdates);
			document.addEventListener('touchend', this.onStopUpdates);

			this.setState({ active: true });
			this.updatePosition(this._rect, x, y);
		}

		/**
   * on stop updates
   */

	}, {
		key: '_onStopUpdates',
		value: function _onStopUpdates() {
			// unset mouse|touch event
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
			    x = _getPosition2.x,
			    y = _getPosition2.y;

			this.updatePosition(this._rect, x, y);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var state = this.state,
			    props = this.props;


			return _react2.default.createElement(
				'div',
				{
					ref: function ref(r) {
						_this2._self = r;
					},
					onMouseDown: this._onStartUpdates.bind(this),
					onTouchStart: this._onStartUpdates.bind(this),
					className: (0, _classnames2.default)('cpMap', props.className, {
						'cpMap-active': state.active
					}) },
				_react2.default.createElement('div', {
					className: 'cpMap__background',
					style: {
						backgroundColor: props.backgroundColor
					} }),
				_react2.default.createElement('div', {
					className: 'cpMap__pointer',
					style: {
						left: this.getPercentageValue(this.props.x),
						bottom: this.getPercentageValue(this.props.y)
					} })
			);
		}
	}]);

	return Map;
}(_react2.default.Component);

Map.propTypes = {
	x: _propTypes2.default.number.isRequired,
	y: _propTypes2.default.number.isRequired,
	backgroundColor: _propTypes2.default.string,
	className: _propTypes2.default.string
};
Map.defaultProps = {
	x: 0,
	y: 0,
	backgroundColor: "transparent",
	className: null
};
exports.default = Map;