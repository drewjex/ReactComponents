import moment from 'moment';
import {
  getDatesInView,
  getIncrementedFocusDate,
  updateDatesChosen,
  reducerSelectDates,
  reducerToggleDatePicker
} from './DatePicker.utils';

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

describe('getDatesInView()', () => {
  it('should get 1 month when numberOfCalendars is 1', () => {
    const result = getDatesInView(STATE_NOT_RANGE);
    expect(result.length).toBe(1);
  });

  it('should get 2 months when numberOfCalendars is 2', () => {
    const result = getDatesInView(STATE_CHOSEN_RANGE);
    expect(result.length).toBe(2);
  });
  
  it('should get 2 months when numberOfCalendars is not set', () => {
    const result = getDatesInView({ ...STATE_CHOSEN_RANGE, numberOfCalendars: undefined });
    expect(result.length).toBe(2);
  });

  it('should get 6 months when numberOfCalendars is 2', () => {
    const result = getDatesInView({ ...STATE_CHOSEN_RANGE, numberOfCalendars: 6 });
    expect(result.length).toBe(6);
  });
});

describe('getIncrementedFocusDate()', () => {
  it('should return the month before if direction is backward', () => {
    const result = getIncrementedFocusDate(APRIL_01_2018, 'backward');
    expect(result.format(YYYY_MM_DD)).toBe(moment(APRIL_01_2018).subtract(1, 'month').format(YYYY_MM_DD));
  });
  
  it('should return the month after if direction is forward', () => {
    const result = getIncrementedFocusDate(APRIL_01_2018, 'forward');
    expect(result.format(YYYY_MM_DD)).toBe(moment(APRIL_01_2018).add(1, 'month').format(YYYY_MM_DD));
  });
});

describe('updateDatesChosen()', () => {
  it('should add a single date if no dates are yet chosen', () => {
    const result = updateDatesChosen(APRIL_01_2018, STATE_CLEAN);
    expect(result.length).toBe(1);
    expect(result[0].format(YYYY_MM_DD)).toBe(APRIL_01_2018.format(YYYY_MM_DD));
  });

  it('should replace the only chosen date in non range if different from already chosen', () => {
    const result = updateDatesChosen(APRIL_01_2018, STATE_HOVERED_RELATIVE);
    expect(result.length).toBe(1);
    expect(result[0].format(YYYY_MM_DD)).toBe(APRIL_01_2018.format(YYYY_MM_DD));
  });

  it('should add a second date to a range if one is already chosen', () => {
    const result = updateDatesChosen(APRIL_03_2018, STATE_APRIL_01);
    expect(result.length).toBe(2);
    expect(result[1].format(YYYY_MM_DD)).toBe(APRIL_03_2018.format(YYYY_MM_DD));
  });

  it('should unselect only date if reclicked in non range', () => {
    const result = updateDatesChosen(APRIL_26_2018, STATE_HOVERED_RELATIVE);
    expect(result.length).toBe(0);
  });

  it('should unselect current 2 chosen in range if a 3rd date is clicked', () => {
    const result = updateDatesChosen(APRIL_03_2018, STATE_CHOSEN_RANGE);
    expect(result.length).toBe(1);
    expect(result[0].format(YYYY_MM_DD)).toBe(APRIL_03_2018.format(YYYY_MM_DD));
  });

  it('should return the clicked date if it is prior to only selected date in a range', () => {
    const result = updateDatesChosen(MARCH_31_2018, STATE_APRIL_01);
    expect(result.length).toBe(1);
    expect(result[0].format(YYYY_MM_DD)).toBe(MARCH_31_2018.format(YYYY_MM_DD));
  });
});

describe('reducerSelectDates()', () => {
  // This help function simplifies logic in app's state management
  it('should provide new dates chosen in range', () => {
    const result = reducerSelectDates(STATE_APRIL_01, { payload: APRIL_03_2018 });
    expect(result.datesChosen[1]).toBeTruthy();
    expect(result.datesChosen[1].format(YYYY_MM_DD)).toBe(APRIL_03_2018.format(YYYY_MM_DD));
  });
  it('should provide new date chosen in non-range', () => {
    const result = reducerSelectDates(STATE_HOVERED_RELATIVE, { payload: APRIL_01_2018 });
    expect(result.datesChosen[0]).toBeTruthy();
    expect(result.datesChosen.length).toBe(1);
    expect(result.datesChosen[0].format(YYYY_MM_DD)).toBe(APRIL_01_2018.format(YYYY_MM_DD));
  });
  it('should close when dates selected and option to close is true', () => {
    const result = reducerSelectDates(STATE_HOVERED_RANGE, { payload: APRIL_06_2018 });
    expect(result.datesChosen.length).toBe(2);
    expect(result.showCalendar).toBe(false);
  });
  it('should not close when dates selected and option to close is false', () => {
    const result = reducerSelectDates(STATE_HOVERED_RANGE, { payload: APRIL_06_2018 }, false);
    expect(result.datesChosen.length).toBe(2);
    expect(result.showCalendar).toBe(true);
  });
});

describe('reducerToggleDatePicker()', () => {
  it('should close date picker if open', () => {
    const result = reducerToggleDatePicker(STATE_FROM_REDUCER);
    expect(result.showCalendar).toBe(false);
  });

  it('should open date picker if closed', () => {
    const result = reducerToggleDatePicker(STATE_FROM_REDUCER_CLOSED);
    expect(result.showCalendar).toBe(true);
  });
});
