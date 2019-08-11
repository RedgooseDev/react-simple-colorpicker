"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = clamp;

/**
 * clamp number
 *
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}