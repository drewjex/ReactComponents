"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarDay;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarDay(props) {
  var buttonClasses = (0, _classnames2.default)({
    CalendarDay: true,
    "CalendarDay--hovered": props.isHovered,
    "CalendarDay--rangeStart": props.placeInRange === "beginning",
    "CalendarDay--rangeMiddle": props.placeInRange === "middle",
    "CalendarDay--rangeEnd": props.placeInRange === "end"
  });

  var spanClasses = (0, _classnames2.default)({
    "CalendarDay-content": true,
    "CalendarDay-content--chosen": props.isChosen,
    "CalendarDay-content--hovered": props.isHovered && !props.isDisabled,
    "CalendarDay-content--rangeStart": props.placeInRange === "beginning",
    "CalendarDay-content--rangeMiddle": props.placeInRange === "middle",
    "CalendarDay-content--rangeEnd": props.placeInRange === "end",
    "is-today": props.isToday
  });

  return _react2.default.createElement(
    "button",
    {
      className: buttonClasses,
      disabled: props.isDisabled ? "disabled" : false,
      onClick: function onClick(event) {
        return props.onClick(props.date);
      },
      onMouseOver: function onMouseOver(event) {
        return props.onMouseOver(props.date);
      },
      onMouseOut: function onMouseOut(event) {
        return props.onMouseOut(props.date);
      },
      type: "button",
      value: props.date.format("YYYY-MM-DD")
    },
    _react2.default.createElement(
      "span",
      { className: spanClasses },
      props.date.format("D")
    )
  );
}

CalendarDay.propTypes = {
  /** Moment date type for showing user the date and providing info on click */
  date: _propTypes2.default.object.isRequired,

  /** Show user if day is in their chosen list */
  isChosen: _propTypes2.default.bool,

  /** Show user they can't interact with this day */
  isDisabled: _propTypes2.default.bool,

  /** Show user our custom hover effect */
  isHovered: _propTypes2.default.bool,

  /** Show user that this date is today */
  isToday: _propTypes2.default.bool,

  /** For styling the range effect */
  placeInRange: _propTypes2.default.string,

  /** Handles clicks, passes date to callback */
  onClick: _propTypes2.default.func.isRequired,

  /** Handle mouse overs, passes date to callback */
  onMouseOver: _propTypes2.default.func.isRequired,

  /** Handle mouse outs, passes date to callback */
  onMouseOut: _propTypes2.default.func.isRequired
};