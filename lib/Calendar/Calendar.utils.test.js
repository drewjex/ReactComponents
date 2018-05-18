'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Calendar = require('./Calendar.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYYY_MM_DD = 'YYYY-MM-DD';
var MARCH_31_2018 = (0, _moment2.default)('2018-03-31', YYYY_MM_DD);
var APRIL_01_2018 = (0, _moment2.default)('2018-04-01', YYYY_MM_DD);
var APRIL_03_2018 = (0, _moment2.default)('2018-04-03', YYYY_MM_DD);
var APRIL_04_2018 = (0, _moment2.default)('2018-04-04', YYYY_MM_DD);
var APRIL_06_2018 = (0, _moment2.default)('2018-04-06', YYYY_MM_DD);
var APRIL_07_2018 = (0, _moment2.default)('2018-04-07', YYYY_MM_DD);
var APRIL_19_2018 = (0, _moment2.default)('2018-04-19', YYYY_MM_DD);
var APRIL_25_2018 = (0, _moment2.default)('2018-04-25', YYYY_MM_DD);
var APRIL_26_2018 = (0, _moment2.default)('2018-04-26', YYYY_MM_DD);
var APRIL_27_2018 = (0, _moment2.default)('2018-04-27', YYYY_MM_DD);
var APRIL_30_2018 = (0, _moment2.default)('2018-04-30', YYYY_MM_DD);
var MAY_03_2018 = (0, _moment2.default)('2018-05-03', YYYY_MM_DD);
var JUNE_01_2018 = (0, _moment2.default)('2018-06-01', YYYY_MM_DD);
var JUNE_30_2018 = (0, _moment2.default)('2018-06-30', YYYY_MM_DD);
var SEP_01_2018 = (0, _moment2.default)('2018-09-01', YYYY_MM_DD);
var SEP_30_2018 = (0, _moment2.default)('2018-09-30', YYYY_MM_DD);
var STATE_APRIL_01 = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_01_2018,
  focusDate: APRIL_01_2018,
  isRange: true
};
var STATE_CHOSEN_RANGE = {
  datesChosen: [APRIL_01_2018, APRIL_06_2018],
  dateHovered: null,
  focusDate: APRIL_01_2018,
  isRange: true,
  numberOfCalendars: 2
};
var STATE_HOVERED_RANGE = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_06_2018,
  focusDate: APRIL_01_2018,
  isRange: true
};
var STATE_NOT_RANGE = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_06_2018,
  focusDate: APRIL_01_2018,
  isRange: false,
  numberOfCalendars: 1
};
var STATE_HOVERED_RELATIVE = {
  datesChosen: [APRIL_26_2018],
  dateHovered: APRIL_26_2018,
  focusDate: APRIL_01_2018,
  isRange: false
};
var STATE_CLEAN = {
  datesChosen: [],
  dateHovered: null,
  focusDate: APRIL_01_2018,
  isRange: true
};
var STATE_FROM_REDUCER = Object.assign({}, STATE_CLEAN, {
  showCalendar: true,
  numberOfCalendars: 2
});
var STATE_FROM_REDUCER_CLOSED = Object.assign({}, STATE_FROM_REDUCER, {
  showCalendar: false
});
var STATE_MIN_MAX = Object.assign({}, STATE_CLEAN, {
  minDate: APRIL_03_2018,
  maxDate: APRIL_06_2018
});

describe('getDaysAfterMonth()', function () {
  it('should get 5 for 2018-04-01', function () {
    var result = (0, _Calendar.getDaysAfterMonth)(APRIL_30_2018);
    expect(result).toBe(5);
  });

  it('should get 0 for 2018-06-30', function () {
    var result = (0, _Calendar.getDaysAfterMonth)(JUNE_30_2018);
    expect(result).toBe(0);
  });
});

describe('getDaysBeforeMonth()', function () {
  it('should get 0 for 2018-04-01', function () {
    var result = (0, _Calendar.getDaysBeforeMonth)(APRIL_01_2018);
    expect(result).toBe(0);
  });

  it('should get 5 for 2018-06-01', function () {
    var result = (0, _Calendar.getDaysBeforeMonth)(JUNE_01_2018);
    expect(result).toBe(5);
  });
});

describe('createMonth()', function () {
  it('should create 5 rows for April 2018', function () {
    var result = (0, _Calendar.createMonth)(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(5);
  });

  it('should create 6 rows for September 2018', function () {
    var result = (0, _Calendar.createMonth)(SEP_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(6);
  });
});

describe('createWeek()', function () {
  it('should have 7 days', function () {
    var result = (0, _Calendar.createWeek)(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(7);
  });
});

describe('createDay()', function () {
  it('should have a date property that is a momentJS date type', function () {
    var result = (0, _Calendar.createDay)(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.date).toBeTruthy();
    expect(_typeof(result.date.format)).toBe('function');
    expect(result.date.format(YYYY_MM_DD)).toBe(APRIL_01_2018.format(YYYY_MM_DD));
  });
});

describe('isDayChosen()', function () {
  it('should return true if date is in datesChosen', function () {
    var result = (0, _Calendar.isDayChosen)(APRIL_01_2018, STATE_APRIL_01);
    expect(result).toBe(true);
  });

  it('should return false if date is NOT it datesChosen', function () {
    var result = (0, _Calendar.isDayChosen)(APRIL_30_2018, STATE_APRIL_01);
    expect(result).toBe(false);
  });
});

describe('isDayHovered()', function () {
  it('should return true if date is hovered', function () {
    var result = (0, _Calendar.isDayHovered)(APRIL_01_2018, STATE_APRIL_01);
    expect(result).toBe(true);
  });

  it('should return false if date is NOT hovered', function () {
    var result = (0, _Calendar.isDayHovered)(APRIL_06_2018, STATE_APRIL_01);
    expect(result).toBe(false);
  });
});

describe('isDayDisabled()', function () {
  it('should return true if before min date', function () {
    var result = (0, _Calendar.isDayDisabled)(MARCH_31_2018, STATE_MIN_MAX);
    expect(result).toBe(true);
  });

  it('should return true if after max date', function () {
    var result = (0, _Calendar.isDayDisabled)(APRIL_07_2018, STATE_MIN_MAX);
    expect(result).toBe(true);
  });

  it('should return false if on min date', function () {
    var result = (0, _Calendar.isDayDisabled)(APRIL_03_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });

  it('should return false if on max date', function () {
    var result = (0, _Calendar.isDayDisabled)(APRIL_06_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });

  it('should return false if between min and max dates', function () {
    var result = (0, _Calendar.isDayDisabled)(APRIL_04_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });

  it('should return false if today and no min supplied', function () {
    var today = (0, _moment2.default)();
    var result = (0, _Calendar.isDayDisabled)(today, STATE_CLEAN);
    expect(result).toBe(false);
  });

  it('should return false if 2 years from today and no max supplied', function () {
    var in2years = (0, _moment2.default)().add(2, 'years');
    var result = (0, _Calendar.isDayDisabled)(in2years, STATE_CLEAN);
    expect(result).toBe(false);
  });

  it('should return true if yesterday and no min supplied', function () {
    var yesterday = (0, _moment2.default)().subtract(1, 'days');
    var result = (0, _Calendar.isDayDisabled)(yesterday, STATE_CLEAN);
    expect(result).toBe(true);
  });

  it('should return true if 2 years from tomorrow and no max supplied', function () {
    var in2years1day = (0, _moment2.default)().add(2, 'years').add(1, 'days');
    var result = (0, _Calendar.isDayDisabled)(in2years1day, STATE_CLEAN);
    expect(result).toBe(true);
  });
});

describe('isInRange()', function () {
  it('should return true if date is first date in chosen range', function () {
    var result = (0, _Calendar.isInRange)(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is middle date in chosen range', function () {
    var result = (0, _Calendar.isInRange)(APRIL_03_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is last date in chosen range', function () {
    var result = (0, _Calendar.isInRange)(APRIL_06_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return false if date is before chosen range', function () {
    var result = (0, _Calendar.isInRange)(MARCH_31_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(false);
  });

  it('should return false if date is after chosen range', function () {
    var result = (0, _Calendar.isInRange)(APRIL_07_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(false);
  });

  it('should return true if date equals only chosen date', function () {
    var result = (0, _Calendar.isInRange)(APRIL_01_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is after only chosen date but before hovered date', function () {
    var result = (0, _Calendar.isInRange)(APRIL_03_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date equals hovered date and hovered date is after only chosen date', function () {
    var result = (0, _Calendar.isInRange)(APRIL_06_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return false if date is before only chosen date', function () {
    var result = (0, _Calendar.isInRange)(MARCH_31_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(false);
  });
});

describe('isToday()', function () {
  it('should return true if given today\'s date', function () {
    var dateToday = (0, _moment2.default)();
    var result = (0, _Calendar.isToday)(dateToday);
    expect(result).toBe(true);
  });

  it('should return false if give a date that is NOT today\'s date', function () {
    var dateYesterday = (0, _moment2.default)().subtract(1, 'days');
    var result = (0, _Calendar.isToday)(dateYesterday);
    expect(result).toBe(false);
  });
});

describe('placeInRange()', function () {
  it('should return "not a range date picker" if date picker is not a range', function () {
    var result = (0, _Calendar.getPlaceInRange)(APRIL_01_2018, STATE_NOT_RANGE);
    expect(result).toBe('not a range date picker');
  });

  it('should return "out of range" if date is before or after range', function () {
    var before = MARCH_31_2018;
    var after = APRIL_30_2018;
    var resultBefore = (0, _Calendar.getPlaceInRange)(before, STATE_CHOSEN_RANGE);
    var resultAfter = (0, _Calendar.getPlaceInRange)(after, STATE_CHOSEN_RANGE);

    expect(resultBefore).toBe('out of range');
    expect(resultAfter).toBe('out of range');
  });

  it('should return "beginning" if date is first in range', function () {
    var result = (0, _Calendar.getPlaceInRange)(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe('beginning');
  });

  it('should return "end" if date is last date in range', function () {
    // TODO: handle hovered situation
    var resultChosen = (0, _Calendar.getPlaceInRange)(APRIL_06_2018, STATE_CHOSEN_RANGE);
    // const resultHovered = getPlaceInRange(APRIL_06_2018, STATE_HOVERED_RANGE);
    expect(resultChosen).toBe('end');
    // expect(resultHovered).toBe('end');
  });

  it('should return "middle" if date is between first and last day in range', function () {
    // TODO: handle hovered situation
    var resultChosen = (0, _Calendar.getPlaceInRange)(APRIL_03_2018, STATE_CHOSEN_RANGE);
    // const resultHovered = getPlaceInRange(APRIL_03_2018, STATE_HOVERED_RANGE);
    expect(resultChosen).toBe('middle');
    // expect(resultHovered).toBe('middle');
  });
});