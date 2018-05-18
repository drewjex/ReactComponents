"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarIncrementor;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarIncrementor(props) {
  var buttonClass = (0, _classnames2.default)({
    "Calendar-incrementor": true,
    "Calendar-incrementor--forward": props.direction === "forward",
    "is-onlyCalendar": props.numberOfCalendars === 1,
    "is-firstCalendar": props.calendarIndex === 0,
    "is-leftAndBefore": props.calendarIndex % 2 === 0 && props.direction === "backward",
    "is-rightAndAfter": props.calendarIndex % 2 === 1 && props.direction === "forward"
  });
  var iconClass = (0, _classnames2.default)({
    "MonthNavigator-icon zmdi": true,
    "zmdi-chevron-left": props.direction === "backward",
    "zmdi-chevron-right": props.direction === "forward"
  });
  return _react2.default.createElement(
    "button",
    {
      className: buttonClass,
      onClick: function onClick(event) {
        return props.clickHandler(props.direction);
      }
    },
    _react2.default.createElement("span", { className: iconClass })
  );
}

CalendarIncrementor.propTypes = {
  /** Direction to move calendars, forward/backward */
  direction: _propTypes2.default.string.isRequired,

  /** Function called on click, callback is provided the direction as its only argument */
  clickHandler: _propTypes2.default.func.isRequired
};