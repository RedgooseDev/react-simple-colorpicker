'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Palette = function (_React$Component) {
	_inherits(Palette, _React$Component);

	function Palette() {
		_classCallCheck(this, Palette);

		return _possibleConstructorReturn(this, (Palette.__proto__ || Object.getPrototypeOf(Palette)).apply(this, arguments));
	}

	_createClass(Palette, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return false;
		}

		/**
   * render item
   *
   * @param {String} color hex type
   * @param {Number} k
   */

	}, {
		key: 'renderItem',
		value: function renderItem(color, k) {
			var _this2 = this;

			return _react2.default.createElement(
				'li',
				{ key: k },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							onClick: function onClick(e) {
								return _this2._onClickItem(color);
							},
							style: { backgroundColor: color } },
						color
					)
				)
			);
		}

		/**
   * on click item
   *
   * @param {String} color
   */

	}, {
		key: '_onClickItem',
		value: function _onClickItem(color) {
			var props = this.props;


			if (props.onSelectColor) {
				props.onSelectColor(color);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;


			return _react2.default.createElement(
				'nav',
				{ className: (0, _classnames2.default)('cpPalette', props.className) },
				_react2.default.createElement(
					'ul',
					null,
					props.colors.map(this.renderItem.bind(this))
				)
			);
		}
	}]);

	return Palette;
}(_react2.default.Component);

Palette.defaultProps = {
	colors: [],
	onSelectColor: function onSelectColor(color) {},
	className: null
};
exports.default = Palette;