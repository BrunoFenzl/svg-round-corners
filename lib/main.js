"use strict";

var _canvas = require("./canvas.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var rangeSlider = document.getElementById('radius-range');

var svgs = _toConsumableArray(document.querySelectorAll('[data-svg]'));

svgs.forEach(function (svg) {
  return svg.setAttribute('data-original-d', svg.getAttribute('d'));
});
svgs.forEach(function (svg) {
  return svg.setAttribute('d', (0, _canvas.roundCorners)(svg.getAttribute('data-original-d'), rangeSlider.value));
});
rangeSlider.addEventListener('input', function () {
  return svgs.forEach(function (svg) {
    return svg.setAttribute('d', (0, _canvas.roundCorners)(svg.getAttribute('data-original-d'), rangeSlider.value));
  });
});