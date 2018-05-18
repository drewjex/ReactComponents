"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Calendar = require("../Calendar");

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DatePicker = require("./DatePicker.utils");

var _Calendar3 = require("../Calendar/Calendar.utils");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    var initFocusDate = _this.props.focusDate || (0, _moment2.default)();
    var initDateHovered = null;
    var initDatesChosen = [];

    _this.state = {
      dateHovered: initDateHovered,
      datesChosen: initDatesChosen,
      focusDate: initFocusDate,
      isRange: _this.props.isRange,
      visibleDates: (0, _DatePicker.getDatesInView)(Object.assign({}, _this.props, {
        dateHovered: initDateHovered,
        datesChosen: initDatesChosen,
        focusDate: initFocusDate
      }))
    };

    _this.clickCalendarIncrementor = _this.clickCalendarIncrementor.bind(_this);
    _this.handleClickOutside = _this.handleClickOutside.bind(_this);
    _this.hoverOffDate = _this.hoverOffDate.bind(_this);
    _this.hoverSelectDate = _this.hoverSelectDate.bind(_this);
    _this.selectDate = _this.selectDate.bind(_this);
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.showCalendar) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    }
  }, {
    key: "clickCalendarIncrementor",
    value: function clickCalendarIncrementor(direction) {
      var newFocusDate = (0, _DatePicker.getIncrementedFocusDate)(this.state.focusDate, direction);
      var newVisibleDates = (0, _DatePicker.getDatesInView)(Object.assign({}, this.getStateForUtils(), {
        focusDate: newFocusDate
      }));
      this.setState({
        focusDate: newFocusDate,
        visibleDates: newVisibleDates
      });
    }
  }, {
    key: "getStateForUtils",
    value: function getStateForUtils() {
      var focusDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.focusDate;

      var result = Object.assign({}, this.props, this.state, {
        focusDate: focusDate
      });
      return result;
    }
  }, {
    key: "getDropdownClasses",
    value: function getDropdownClasses() {
      var result = (0, _classnames2.default)({
        "DatePicker-dropdown": true,
        "is-singleCalendarOnly": this.props.numberOfCalendars === 1
      });
      return result;
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(event) {
      if (this.dropdownElement && !this.dropdownElement.contains(event.target) && this.props.closeDatePicker) {
        this.props.closeDatePicker();
      }
    }
  }, {
    key: "hoverOffDate",
    value: function hoverOffDate() {
      console.log('hover off date from date picker');
      this.setState({
        dateHovered: null,
        visibleDates: (0, _DatePicker.getDatesInView)(Object.assign({}, this.getStateForUtils(), {
          dateHovered: null
        }))
      });
    }
  }, {
    key: "hoverSelectDate",
    value: function hoverSelectDate(date) {
      console.log('hover select date from date picker');
      if ((0, _Calendar3.isDayDisabled)(date, this.getStateForUtils())) {
        return;
      }

      this.setState({
        dateHovered: date,
        visibleDates: (0, _DatePicker.getDatesInView)(Object.assign({}, this.getStateForUtils(), {
          dateHovered: date,
          datesChosen: this.state.datesChosen
        }))
      });
    }
  }, {
    key: "selectDate",
    value: function selectDate(date) {
      console.log('select date from date picker');
      var nextDatesChosen = (0, _DatePicker.updateDatesChosen)(date, this.state);
      var nextDateHovered = null;
      var nextVisibleDates = (0, _DatePicker.getDatesInView)(Object.assign({}, this.state, {
        datesChosen: nextDatesChosen,
        dateHovered: nextDateHovered
      }));
      this.setState({
        datesChosen: nextDatesChosen,
        dateHovered: nextDateHovered,
        visibleDates: nextVisibleDates
      });

      if (this.props.onChange && typeof this.props.onChange === "function") {
        this.props.onChange(nextDatesChosen);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "DatePicker" },
        !this.props.isOpen ? null : _react2.default.createElement(
          "div",
          {
            ref: function ref(node) {
              return _this2.dropdownElement = node;
            },
            className: this.getDropdownClasses()
          },
          _react2.default.createElement(
            "div",
            { className: "DatePicker-calendars" },
            this.state.visibleDates.map(function (month, index) {
              return _react2.default.createElement(_Calendar2.default, {
                index: index,
                key: index,
                state: _this2.getStateForUtils(month[0][6].date),
                month: _this2.state.visibleDates[index],
                clickCalendarIncrementor: _this2.clickCalendarIncrementor,
                clickSelectDate: _this2.selectDate,
                hoverSelectDate: _this2.hoverSelectDate,
                hoverOffDate: _this2.hoverOffDate,
                numberOfCalendars: _this2.props.numberOfCalendars
              });
            })
          )
        )
      );
    }
  }]);

  return DatePicker;
}(_react.Component);

exports.default = DatePicker;


DatePicker.propTypes = {

  datesChosen: _propTypes2.default.array.isRequired,

  isOpen: _propTypes2.default.bool.isRequired,

  onChange: _propTypes2.default.func.isRequired,

  /** Moment date to guarantee is visible the first time the date picker opens */
  focusDate: _propTypes2.default.object,

  isRange: _propTypes2.default.bool,

  numberOfCalendars: _propTypes2.default.number
};

DatePicker.defaultProps = {
  isRange: false,
  numberOfCalendars: 1,
  focusDate: (0, _moment2.default)()
};