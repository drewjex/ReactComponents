"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarLabels;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Calendar = require("./Calendar.utils");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarLabels() {
  function getClassNames(day) {
    return (0, _classnames2.default)({
      "Calendar-label": true,
      "Calendar-label--weekend": day.isWeekend
    });
  }

  return _react2.default.createElement(
    "div",
    { className: "Calendar-labels" },
    (0, _Calendar.getCalendarLabels)().map(function (label) {
      return _react2.default.createElement(
        "div",
        { className: getClassNames(label), key: label.text },
        label.text.substring(0, 2)
      );
    })
  );
}