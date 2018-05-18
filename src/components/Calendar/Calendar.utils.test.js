import moment from 'moment';
import {
  createDay,
  createMonth,
  createWeek,
  getDaysAfterMonth,
  getDaysBeforeMonth,
  isDayChosen,
  isDayHovered,
  isDayDisabled,
  isInRange,
  isToday,
  getPlaceInRange,
} from './Calendar.utils';

const YYYY_MM_DD = 'YYYY-MM-DD';
const MARCH_31_2018 = moment('2018-03-31', YYYY_MM_DD);
const APRIL_01_2018 = moment('2018-04-01', YYYY_MM_DD);
const APRIL_03_2018 = moment('2018-04-03', YYYY_MM_DD);
const APRIL_04_2018 = moment('2018-04-04', YYYY_MM_DD);
const APRIL_06_2018 = moment('2018-04-06', YYYY_MM_DD);
const APRIL_07_2018 = moment('2018-04-07', YYYY_MM_DD);
const APRIL_19_2018 = moment('2018-04-19', YYYY_MM_DD);
const APRIL_25_2018 = moment('2018-04-25', YYYY_MM_DD);
const APRIL_26_2018 = moment('2018-04-26', YYYY_MM_DD);
const APRIL_27_2018 = moment('2018-04-27', YYYY_MM_DD);
const APRIL_30_2018 = moment('2018-04-30', YYYY_MM_DD);
const MAY_03_2018 = moment('2018-05-03', YYYY_MM_DD);
const JUNE_01_2018 = moment('2018-06-01', YYYY_MM_DD);
const JUNE_30_2018 = moment('2018-06-30', YYYY_MM_DD);
const SEP_01_2018 = moment('2018-09-01', YYYY_MM_DD);
const SEP_30_2018 = moment('2018-09-30', YYYY_MM_DD);
const STATE_APRIL_01 = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_01_2018,
  focusDate: APRIL_01_2018,
  isRange: true
};
const STATE_CHOSEN_RANGE = {
  datesChosen: [APRIL_01_2018, APRIL_06_2018],
  dateHovered: null,
  focusDate: APRIL_01_2018,
  isRange: true,
  numberOfCalendars: 2
};
const STATE_HOVERED_RANGE = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_06_2018,
  focusDate: APRIL_01_2018,
  isRange: true
};
const STATE_NOT_RANGE = {
  datesChosen: [APRIL_01_2018],
  dateHovered: APRIL_06_2018,
  focusDate: APRIL_01_2018,
  isRange: false,
  numberOfCalendars: 1
};
const STATE_HOVERED_RELATIVE = {
  datesChosen: [APRIL_26_2018],
  dateHovered: APRIL_26_2018,
  focusDate: APRIL_01_2018,
  isRange: false
};
const STATE_CLEAN = {
  datesChosen: [],
  dateHovered: null,
  focusDate: APRIL_01_2018,
  isRange: true
};
const STATE_FROM_REDUCER = {
  ...STATE_CLEAN,
  showCalendar: true,
  numberOfCalendars: 2
};
const STATE_FROM_REDUCER_CLOSED = {
  ...STATE_FROM_REDUCER,
  showCalendar: false
};
const STATE_MIN_MAX = {
  ...STATE_CLEAN,
  minDate: APRIL_03_2018,
  maxDate: APRIL_06_2018
};

describe('getDaysAfterMonth()', () => {
  it('should get 5 for 2018-04-01', () => {
    const result = getDaysAfterMonth(APRIL_30_2018);
    expect(result).toBe(5);
  });

  it('should get 0 for 2018-06-30', () => {
    const result = getDaysAfterMonth(JUNE_30_2018);
    expect(result).toBe(0);
  });
});

describe('getDaysBeforeMonth()', () => {
  it('should get 0 for 2018-04-01', () => {
    const result = getDaysBeforeMonth(APRIL_01_2018);
    expect(result).toBe(0);
  });

  it('should get 5 for 2018-06-01', () => {
    const result = getDaysBeforeMonth(JUNE_01_2018);
    expect(result).toBe(5);
  });
});

describe('createMonth()', () => {
  it('should create 5 rows for April 2018', () => {
    const result = createMonth(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(5);
  });

  it('should create 6 rows for September 2018', () => {
    const result = createMonth(SEP_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(6);
  });
});

describe('createWeek()', () => {
  it('should have 7 days', () => {
    const result = createWeek(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(7);
  });
});

describe('createDay()', () => {
  it('should have a date property that is a momentJS date type', () => {
    const result = createDay(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result.date).toBeTruthy();
    expect(typeof result.date.format).toBe('function');
    expect(result.date.format(YYYY_MM_DD)).toBe(APRIL_01_2018.format(YYYY_MM_DD));
  });
});

describe('isDayChosen()', () => {
  it('should return true if date is in datesChosen', () => {
    const result = isDayChosen(APRIL_01_2018, STATE_APRIL_01);
    expect(result).toBe(true);
  });

  it('should return false if date is NOT it datesChosen', () => {
    const result = isDayChosen(APRIL_30_2018, STATE_APRIL_01);
    expect(result).toBe(false);
  });
});

describe('isDayHovered()', () => {
  it('should return true if date is hovered', () => {
    const result = isDayHovered(APRIL_01_2018, STATE_APRIL_01);
    expect(result).toBe(true);
  });

  it('should return false if date is NOT hovered', () => {
    const result = isDayHovered(APRIL_06_2018, STATE_APRIL_01);
    expect(result).toBe(false);
  });
});

describe('isDayDisabled()', () => {
  it('should return true if before min date', () => {
    const result = isDayDisabled(MARCH_31_2018, STATE_MIN_MAX);
    expect(result).toBe(true);
  });

  it('should return true if after max date', () => {
    const result = isDayDisabled(APRIL_07_2018, STATE_MIN_MAX);
    expect(result).toBe(true);
  });

  it('should return false if on min date', () => {
    const result = isDayDisabled(APRIL_03_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });

  it('should return false if on max date', () => {
    const result = isDayDisabled(APRIL_06_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });
  
  it('should return false if between min and max dates', () => {
    const result = isDayDisabled(APRIL_04_2018, STATE_MIN_MAX);
    expect(result).toBe(false);
  });

  it('should return false if today and no min supplied', () => {
    const today = moment();
    const result = isDayDisabled(today, STATE_CLEAN);
    expect(result).toBe(false);
  });

  it('should return false if 2 years from today and no max supplied', () => {
    const in2years = moment().add(2, 'years');
    const result = isDayDisabled(in2years, STATE_CLEAN);
    expect(result).toBe(false);
  });

  it('should return true if yesterday and no min supplied', () => {
    const yesterday = moment().subtract(1, 'days');
    const result = isDayDisabled(yesterday, STATE_CLEAN);
    expect(result).toBe(true);
  });

  it('should return true if 2 years from tomorrow and no max supplied', () => {
    const in2years1day = moment().add(2, 'years').add(1, 'days');
    const result = isDayDisabled(in2years1day, STATE_CLEAN);
    expect(result).toBe(true);
  });
});

describe('isInRange()', () => {
  it('should return true if date is first date in chosen range', () => {
    const result = isInRange(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is middle date in chosen range', () => {
    const result = isInRange(APRIL_03_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is last date in chosen range', () => {
    const result = isInRange(APRIL_06_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(true);
  });

  it('should return false if date is before chosen range', () => {
    const result = isInRange(MARCH_31_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(false);
  });
  
  it('should return false if date is after chosen range', () => {
    const result = isInRange(APRIL_07_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe(false);
  });

  it('should return true if date equals only chosen date', () => {
    const result = isInRange(APRIL_01_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date is after only chosen date but before hovered date', () => {
    const result = isInRange(APRIL_03_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return true if date equals hovered date and hovered date is after only chosen date', () => {
    const result = isInRange(APRIL_06_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(true);
  });

  it('should return false if date is before only chosen date', () => {
    const result = isInRange(MARCH_31_2018, STATE_HOVERED_RANGE);
    expect(result).toBe(false);
  });
});

describe('isToday()', () => {
  it('should return true if given today\'s date', () => {
    const dateToday = moment();
    const result = isToday(dateToday);
    expect(result).toBe(true);
  });

  it('should return false if give a date that is NOT today\'s date', () => {
    const dateYesterday = moment().subtract(1, 'days');
    const result = isToday(dateYesterday);
    expect(result).toBe(false);
  });
});

describe('placeInRange()', () => {
  it('should return "not a range date picker" if date picker is not a range', () => {
    const result = getPlaceInRange(APRIL_01_2018, STATE_NOT_RANGE);
    expect(result).toBe('not a range date picker');
  });

  it('should return "out of range" if date is before or after range', () => {
    const before = MARCH_31_2018;
    const after = APRIL_30_2018;
    const resultBefore = getPlaceInRange(before, STATE_CHOSEN_RANGE);
    const resultAfter = getPlaceInRange(after, STATE_CHOSEN_RANGE);

    expect(resultBefore).toBe('out of range');
    expect(resultAfter).toBe('out of range');
  });

  it('should return "beginning" if date is first in range', () => {
    const result = getPlaceInRange(APRIL_01_2018, STATE_CHOSEN_RANGE);
    expect(result).toBe('beginning');
  });

  it('should return "end" if date is last date in range', () => {
    // TODO: handle hovered situation
    const resultChosen = getPlaceInRange(APRIL_06_2018, STATE_CHOSEN_RANGE);
    // const resultHovered = getPlaceInRange(APRIL_06_2018, STATE_HOVERED_RANGE);
    expect(resultChosen).toBe('end');
    // expect(resultHovered).toBe('end');
  });
  
  it('should return "middle" if date is between first and last day in range', () => {
    // TODO: handle hovered situation
    const resultChosen = getPlaceInRange(APRIL_03_2018, STATE_CHOSEN_RANGE);
    // const resultHovered = getPlaceInRange(APRIL_03_2018, STATE_HOVERED_RANGE);
    expect(resultChosen).toBe('middle');
    // expect(resultHovered).toBe('middle');
  });
});