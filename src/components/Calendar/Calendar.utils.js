import moment from "moment";

export const YYYY_MM_DD = "YYYY-MM-DD";

export function createDay(date, state) {
  const result = {
    date,
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

export function createMonth(focusDate, state) {
  const monthState = {
    ...state,
    focusDate
  };
  const monthStart = moment(focusDate).startOf("month");
  const monthEnd = moment(focusDate).endOf("month");
  const daysBefore = getDaysBeforeMonth(monthStart);
  const daysAfter = getDaysAfterMonth(monthEnd);
  const daysInMonth = focusDate.daysInMonth();
  const daysOnCalendar = daysBefore + daysInMonth + daysAfter;
  const firstDayOnCalendar = moment(monthStart).subtract(daysBefore, "days");
  let firstDayOfWeek = firstDayOnCalendar;
  let result = [];

  for (let i = 0; i < daysOnCalendar / 7; i++) {
    result[i] = createWeek(firstDayOfWeek, monthState);
    firstDayOfWeek = moment(firstDayOfWeek).add(7, "days");
  }

  return result;
}

export function createWeek(firstDayOfWeek, state) {
  let result = [];
  let currentDay = firstDayOfWeek;

  for (let i = 0; i < 7; i++) {
    result[i] = createDay(currentDay, state);
    currentDay = moment(currentDay).add(1, "day");
  }

  return result;
}

export function getCalendarLabels() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return days.map(day => ({
    text: day,
    isWeekend: day === "Sunday" || day === "Saturday"
  }));
}

export function getDateType(date, state) {
  if (state.focusDate.format("MM") !== date.format("MM")) {
    return "padding-day";
  }
  return "day";
}

export function getDaysBeforeMonth(firstDayOfMonth) {
  const result = firstDayOfMonth.day();
  return result;
}

export function getDefaultState() {
  return {
    datesChosen: [
      moment(),
      moment().add(1, 'day')
    ],
    focusDate: moment()
  };
}

export function getDaysAfterMonth(lastDayOfMonth) {
  // remember, .day() works with zero-based values
  return 6 - lastDayOfMonth.day();
}

export function getPlaceInRange(date, state) {
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

export function isDayChosen(date, state) {
  if (
    state.datesChosen[0] &&
    state.datesChosen[0].format(YYYY_MM_DD) === date.format(YYYY_MM_DD)
  ) {
    return true;
  } else if (
    state.datesChosen[1] &&
    state.datesChosen[1].format(YYYY_MM_DD) === date.format(YYYY_MM_DD)
  ) {
    return true;
  }
  return false;
}

export function isDayHovered(date, state) {
  if (!state.dateHovered) {
    return false;
  }
  return state.dateHovered.format(YYYY_MM_DD) === date.format(YYYY_MM_DD);
}

export function isDayDisabled(date, state) {
  const min = state.minDate || moment();
  const max = state.maxDate || moment().add(2, "years");
  const minFormatted = min.format(YYYY_MM_DD);
  const maxFormatted = max.format(YYYY_MM_DD);
  const dateFormatted = date.format(YYYY_MM_DD);

  if (dateFormatted === minFormatted || dateFormatted === maxFormatted) {
    return false;
  }

  if (min.unix() <= date.unix() && date.unix() <= max.unix()) {
    return false;
  }

  return true;
}

export function isInRange(date, state) {
  // expecting datesChosen and dateHovered in state
  // this assumes datesChosen are ordered

  // handling chosen dates
  if (state.datesChosen.length === 2) {
    if (isDayChosen(date, state)) {
      // is one of the chosen dates
      return true;
    } else if (
      date.unix() > state.datesChosen[0].unix() &&
      date.unix() < state.datesChosen[1].unix()
    ) {
      // this is between the chosen dates
      return true;
    }
  }

  // handling hover, if 1 date is chosen and hovered date is >= only date chosen
  if (
    state.datesChosen.length === 1 &&
    state.dateHovered &&
    state.dateHovered.unix() >= state.datesChosen[0].unix()
  ) {
    if (
      state.datesChosen[0].format(YYYY_MM_DD) === date.format(YYYY_MM_DD) ||
      state.dateHovered.format(YYYY_MM_DD) === date.format(YYYY_MM_DD)
    ) {
      // is the chosen date or hovered date
      return true;
    } else if (state.datesChosen[0] < date && state.dateHovered > date) {
      // is between chosen and hovered dates
      return true;
    }
  }
  return false;
}

export function isToday(date) {
  const todayFormatted = moment().format(YYYY_MM_DD);
  const dateFormatted = date.format(YYYY_MM_DD);
  return todayFormatted === dateFormatted;
}