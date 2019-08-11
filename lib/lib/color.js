"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToHsv = parseToHsv;
exports.toRgbString = toRgbString;
exports.equals = equals;
exports.isDark = isDark;

var _parse = _interopRequireDefault(require("pure-color/parse"));

var _rgb2hsv = _interopRequireDefault(require("pure-color/convert/rgb2hsv"));

var _hsv2rgb = _interopRequireDefault(require("pure-color/convert/hsv2rgb"));

var _rgb2string = _interopRequireDefault(require("pure-color/convert/rgb2string"));

var _rgb2grayscale = _interopRequireDefault(require("pure-color/convert/rgb2grayscale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * convert to hsv color type
 *
 * @param {String} color
 * @return {Array}
 */
function parseToHsv(color) {
  color = (0, _parse["default"])(color);
  var hsv = (0, _rgb2hsv["default"])(color);
  var alpha = color.length === 4 ? color[3] : 1;
  hsv.push(alpha);
  return hsv;
}
/**
 * convert HSV to RGB
 *
 * @param {Array} hsv
 * @return {String}
 */


function toRgbString(hsv) {
  var rgb = (0, _hsv2rgb["default"])(hsv);

  if (hsv.length === 4) {
    rgb.push(hsv[3]);
  }

  return (0, _rgb2string["default"])(rgb);
}
/**
 * equals
 *
 * @param {Array} hsv1
 * @param {Array} hsv2
 * @return {Boolean}
 */


function equals(hsv1, hsv2) {
  return toRgbString(hsv1) === toRgbString(hsv2);
}
/**
 * is darkness tone
 *
 * @param {Array} hsv
 * @return {Boolean}
 */


function isDark(hsv) {
  return (0, _rgb2grayscale["default"])((0, _hsv2rgb["default"])(hsv)) <= 128;
}