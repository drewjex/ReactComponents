'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarPaddingDay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./CalendarDay.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarPaddingDay(props) {
  return _react2.default.createElement('span', {
    className: 'CalendarDay CalendarDay--padding',
    'data-date': props.date.format("YYYY-MM-DD")
  });
}

CalendarPaddingDay.propTypes = {
  /** Date represented by this padding day */
  date: _propTypes2.default.object.isRequired
};