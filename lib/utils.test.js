"use strict";

var _utils = _interopRequireDefault(require("./utils"));

var _testVariables = _interopRequireDefault(require("./testVariables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('should parse path', function () {
  var parsed = _utils.default.pathParser(_testVariables.default.pathSquare, false);

  expect(parsed).toEqual(_testVariables.default.commandsSquare);
});
test('should remove overlaped', function () {
  var abs = _testVariables.default.absOverlapped.map(_utils.default.removeOverlapped);

  console.log(abs);
  expect(abs).toEqual(_testVariables.default.absNoOverlap);
});