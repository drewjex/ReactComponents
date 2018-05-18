"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YYYY_MM_DD = undefined;
exports.createDay = createDay;
exports.createMonth = createMonth;
exports.createWeek = createWeek;
exports.getCalendarLabels = getCalendarLabels;
exports.getDateType = getDateType;
exports.getDaysBeforeMonth = getDaysBeforeMonth;
exports.getDefaultState = getDefaultState;
exports.getDaysAfterMonth = getDaysAfterMonth;
exports.getPlaceInRange = getPlaceInRange;
exports.isDayChosen = isDayChosen;
exports.isDayHovered = isDayHovered;
exports.isDayDisabled = isDayDisabled;
exports.isInRange = isInRange;
exports.isToday = isToday;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYYY_MM_DD = exports.YYYY_MM_DD = "YYYY-MM-DD";

function createDay(date, state) {
  var result = {
    date: date,
    isChosen: isDayChosen(date, state),
    isDisabled: isDayDisabled(date, state),
    isHovered: isDayHovered(date, state),
    isInRange: isInRange(date, state),
    isToday: isToday(date),
    placeInRange: getPlaceInRange(date, state),
    type: getDateType(date, state)
  };
  return result;
}

function createMonth(focusDate, state) {
  var monthState = Object.assign({}, state, {
    focusDate: focusDate
  });
  var monthStart = (0, _moment2.default)(focusDate).startOf("month");
  var monthEnd = (0, _moment2.default)(focusDate).endOf("month");
  var daysBefore = getDaysBeforeMonth(monthStart);
  var daysAfter = getDaysAfterMonth(monthEnd);
  var daysInMonth = focusDate.daysInMonth();
  var daysOnCalendar = daysBefore + daysInMonth + daysAfter;
  var firstDayOnCalendar = (0, _moment2.default)(monthStart).subtract(daysBefore, "days");
  var firstDayOfWeek = firstDayOnCalendar;
  var result = [];

  for (var i = 0; i < daysOnCalendar / 7; i++) {
    result[i] = createWeek(firstDayOfWeek, monthState);
    firstDayOfWeek = (0, _moment2.default)(firstDayOfWeek).add(7, "days");
  }

  return result;
}

function createWeek(firstDayOfWeek, state) {
  var result = [];
  var currentDay = firstDayOfWeek;

  for (var i = 0; i < 7; i++) {
    result[i] = createDay(currentDay, state);
    currentDay = (0, _moment2.default)(currentDay).add(1, "day");
  }

  return result;
}

function getCalendarLabels() {
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days.map(function (day) {
    return {
      text: day,
      isWeekend: day === "Sunday" || day === "Saturday"
    };
  });
}

function getDateType(date, state) {
  if (state.focusDate.format("MM") !== date.format("MM")) {
    return "padding-day";
  }
  return "day";
}

function getDaysBeforeMonth(firstDayOfMonth) {
  var result = firstDayOfMonth.day();
  return result;
}

function getDefaultState() {
  return {
    datesChosen: [(0, _moment2.default)(), (0, _moment2.default)().add(1, 'day')],
    focusDate: (0, _moment2.default)()
  };
}

function getDaysAfterMonth(lastDayOfMonth) {
  // remember, .day() works with zero-based values
  return 6 - lastDayOfMonth.day();
}

function getPlaceInRange(date, state) {
  if (!state.isRange) {
    return "not a range date picker";
  }

  // out of range
  if (!isInRange(date, state)) {
    return "out of range";
  }

  // in range, beginning
  if (date.format(YYYY_MM_DD) === state.datesChosen[0].format(YYYY_MM_DD)) {
    return "beginning";
  }

  // in range, end
  if (state.datesChosen[1]) {
    if (date.format(YYYY_MM_DD) === state.datesChosen[1].format(YYYY_MM_DD)) {
      return "end";
    }
  }
  if (state.dateHovered && state.datesChosen.length === 1) {
    if (date.format(YYYY_MM_DD) === state.dateHovered.format(YYYY_MM_DD)) {
      return "end";
    }
  }

  return "middle";
}

function isDayChosen(date, state) {
  if (state.datesChosen[0] && state.datesChosen[0].format(YYYY_MM_DD) === date.format(YYYY_MM_DD)) {
    return true;
  } else if (state.datesChosen[1] && state.datesChosen[1].format(YYYY_MM_DD) === date.format(YYYY_MM_DD)) {
    return true;
  }
  return false;
}

function isDayHovered(date, state) {
  if (!state.dateHovered) {
    return false;
  }
  return state.dateHovered.format(YYYY_MM_DD) === date.format(YYYY_MM_DD);
}

function isDayDisabled(date, state) {
  var min = state.minDate || (0, _moment2.default)();
  var max = state.maxDate || (0, _moment2.default)().add(2, "years");
  var minFormatted = min.format(YYYY_MM_DD);
  var maxFormatted = max.format(YYYY_MM_DD);
  var dateFormatted = date.format(YYYY_MM_DD);

  if (dateFormatted === minFormatted || dateFormatted === maxFormatted) {
    return false;
  }

  if (min.unix() <= date.unix() && date.unix() <= max.unix()) {
    return false;
  }

  return true;
}

function isInRange(date, state) {
  // expecting datesChosen and dateHovered in state
  // this assumes datesChosen are ordered

  // handling chosen dates
  if (state.datesChosen.length === 2) {
    if (isDayChosen(date, state)) {
      // is one of the chosen dates
      return true;
    } else if (date.unix() > state.datesChosen[0].unix() && date.unix() < state.datesChosen[1].unix()) {
      // this is between the chosen dates
      return true;
    }
  }

  // handling hover, if 1 date is chosen and hovered date is >= only date chosen
  if (state.datesChosen.length === 1 && state.dateHovered && state.dateHovered.unix() >= state.datesChosen[0].unix()) {
    if (state.datesChosen[0].format(YYYY_MM_DD) === date.format(YYYY_MM_DD) || state.dateHovered.format(YYYY_MM_DD) === date.format(YYYY_MM_DD)) {
      // is the chosen date or hovered date
      return true;
    } else if (state.datesChosen[0] < date && state.dateHovered > date) {
      // is between chosen and hovered dates
      return true;
    }
  }
  return false;
}

function isToday(date) {
  var todayFormatted = (0, _moment2.default)().format(YYYY_MM_DD);
  var dateFormatted = date.format(YYYY_MM_DD);
  return todayFormatted === dateFormatted;
}