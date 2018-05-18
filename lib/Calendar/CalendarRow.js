"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarRow;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CalendarDay = require("./CalendarDay");

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _CalendarPaddingDay = require("./CalendarPaddingDay");

var _CalendarPaddingDay2 = _interopRequireDefault(_CalendarPaddingDay);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarRow(props) {
  return _react2.default.createElement(
    "div",
    { className: "Calendar-row" },
    props.rowDays.map(function (day, index, readOnlyArray) {
      return day.type === "day" ? _react2.default.createElement(_CalendarDay2.default, Object.assign({}, day, {
        onClick: props.clickSelectDate,
        onMouseOver: props.hoverSelectDate,
        onMouseOut: props.hoverOffDate,
        key: day.date.unix(),
        row: props.row
      })) : _react2.default.createElement(_CalendarPaddingDay2.default, { date: day.date, key: day.date.unix() });
    })
  );
}

CalendarRow.propTypes = {
  /** Array of dates with their states */
  rowDays: _propTypes2.default.array.isRequired,

  /** For CalendarDay to handle clicks */
  clickSelectDate: _propTypes2.default.func.isRequired,

  /** For CalendarDay to handl mouse overs */
  hoverSelectDate: _propTypes2.default.func.isRequired,

  /** For CalendarDay to handl mouse outs */
  hoverOffDate: _propTypes2.default.func.isRequired
};