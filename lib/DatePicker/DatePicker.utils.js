"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YYYY_MM_DD = undefined;
exports.getDatesInView = getDatesInView;
exports.getIncrementedFocusDate = getIncrementedFocusDate;
exports.updateDatesChosen = updateDatesChosen;
exports.reducerSelectDates = reducerSelectDates;
exports.reducerToggleDatePicker = reducerToggleDatePicker;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _Calendar = require("../Calendar/Calendar.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var YYYY_MM_DD = exports.YYYY_MM_DD = "YYYY-MM-DD";

function getDatesInView(state) {
  var result = [];
  var numberOfCalendars = state.numberOfCalendars || 2;

  for (var i = 0; i < numberOfCalendars; i++) {
    if (i === 0) {
      result.push((0, _Calendar.createMonth)((0, _moment2.default)(state.focusDate), state));
    } else {
      result.push((0, _Calendar.createMonth)((0, _moment2.default)(state.focusDate).add(i, "months"), state));
    }
  }

  return result;
}

function getIncrementedFocusDate(date, direction) {
  var newFocusDate = void 0;
  if (direction === "forward") {
    newFocusDate = (0, _moment2.default)(date).add(1, "months");
  } else {
    newFocusDate = (0, _moment2.default)(date).subtract(1, "months");
  }
  return newFocusDate;
}

function updateDatesChosen(dateClicked, state) {
  // no date chosen yet
  if (state.datesChosen.length === 0) {
    return [dateClicked];
  }

  // non-range, existing date chosen, different date clicked
  if (!state.isRange && state.datesChosen.length === 1 && state.datesChosen[0].format(YYYY_MM_DD) !== dateClicked.format(YYYY_MM_DD)) {
    return [dateClicked];
  }

  // existing single date chosen, NOT same as date clicked, is range
  if (state.datesChosen.length === 1 && dateClicked.format(YYYY_MM_DD) !== state.datesChosen[0].format(YYYY_MM_DD) && state.isRange) {
    if (dateClicked.unix() < state.datesChosen[0].unix()) {
      // dateClicked is prior to existing single date chosen
      return [dateClicked];
    }
    // dateClicked is after existing single date chosen
    return [].concat(_toConsumableArray(state.datesChosen), [dateClicked]);
  }

  // 2 existing dates chosen
  if (state.datesChosen.length === 2) {
    return [dateClicked];
  }

  // no conditions above match
  return [];
}

function reducerSelectDates(state, action) {
  var closeOnSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var nextDatesChosen = updateDatesChosen(action.payload, state);
  var nextShowCalendar = void 0;
  if (closeOnSelection) {
    nextShowCalendar = state.isRange ? !(nextDatesChosen.length === 2) : !(nextDatesChosen.length === 1);
  } else {
    nextShowCalendar = true;
  }
  var nextDateHovered = nextShowCalendar === false ? null : state.dateHovered;
  var nextVisibleDates = getDatesInView(Object.assign({}, state, {
    dateHovered: nextDateHovered,
    datesChosen: nextDatesChosen
  }));
  return Object.assign({}, state, {
    datesChosen: nextDatesChosen,
    showCalendar: nextShowCalendar,
    visibleDates: nextVisibleDates
  });
}

function reducerToggleDatePicker(state) {
  return Object.assign({}, state, {
    showCalendar: !state.showCalendar
  });
}