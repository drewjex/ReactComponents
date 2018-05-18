"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calendar;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CalendarRow = require("./CalendarRow");

var _CalendarRow2 = _interopRequireDefault(_CalendarRow);

var _CalendarLabels = require("./CalendarLabels");

var _CalendarLabels2 = _interopRequireDefault(_CalendarLabels);

var _CalendarIncrementor = require("./CalendarIncrementor");

var _CalendarIncrementor2 = _interopRequireDefault(_CalendarIncrementor);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Calendar(props) {
  function getRowText(index, arrayLength) {
    if (index === 0) {
      return "first";
    } else if (index === arrayLength - 1) {
      return "last";
    }

    return "middle";
  }

  return _react2.default.createElement(
    "div",
    { className: "Calendar" },
    _react2.default.createElement(_CalendarIncrementor2.default, {
      numberOfCalendars: props.numberOfCalendars,
      calendarIndex: props.index,
      clickHandler: props.clickCalendarIncrementor,
      direction: "backward"
    }),
    _react2.default.createElement(_CalendarIncrementor2.default, {
      numberOfCalendars: props.numberOfCalendars,
      calendarIndex: props.index,
      clickHandler: props.clickCalendarIncrementor,
      direction: "forward"
    }),
    _react2.default.createElement(
      "div",
      { className: "Calendar-name" },
      props.month[0][6].date.format("MMMM YYYY")
    ),
    _react2.default.createElement(_CalendarLabels2.default, null),
    props.month.map(function (week, rowIndex, readOnlyArray) {
      return _react2.default.createElement(_CalendarRow2.default, {
        clickSelectDate: props.clickSelectDate,
        key: rowIndex,
        rowDays: week,
        row: getRowText(rowIndex, readOnlyArray.length),
        hoverSelectDate: props.hoverSelectDate,
        hoverOffDate: props.hoverOffDate
      });
    })
  );
}

Calendar.propTypes = {
  /** Function to handle calendar incrementor clicks */
  clickCalendarIncrementor: _propTypes2.default.func.isRequired,

  /** Function to handle the click of a day */
  clickSelectDate: _propTypes2.default.func.isRequired,

  /** Function to handle mouse out of a day */
  hoverOffDate: _propTypes2.default.func.isRequired,

  /** Index of calendar when there are mulptiple */
  index: _propTypes2.default.number.isRequired,

  /** Function to handle mouse over of a day */
  hoverSelectDate: _propTypes2.default.func.isRequired,

  /** Array of calendar weeks in month */
  month: _propTypes2.default.array.isRequired,

  /** Number of calendars simultaneously visible */
  numberOfCalendars: _propTypes2.default.number.isRequired
};