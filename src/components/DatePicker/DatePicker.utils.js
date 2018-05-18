import moment from "moment";
import { createMonth } from '../Calendar/Calendar.utils';

export const YYYY_MM_DD = "YYYY-MM-DD";

export function getDatesInView(state) {
  let result = [];
  const numberOfCalendars = state.numberOfCalendars || 2;

  for (let i = 0; i < numberOfCalendars; i++) {
    if (i === 0) {
      result.push(createMonth(moment(state.focusDate), state));
    } else {
      result.push(createMonth(moment(state.focusDate).add(i, "months"), state));
    }
  }

  return result;
}

export function getIncrementedFocusDate(date, direction) {
  let newFocusDate;
  if (direction === "forward") {
    newFocusDate = moment(date).add(1, "months");
  } else {
    newFocusDate = moment(date).subtract(1, "months");
  }
  return newFocusDate;
}

export function updateDatesChosen(dateClicked, state) {
  // no date chosen yet
  if (state.datesChosen.length === 0) {
    return [dateClicked];
  }

  // non-range, existing date chosen, different date clicked
  if (
    !state.isRange &&
    state.datesChosen.length === 1 &&
    state.datesChosen[0].format(YYYY_MM_DD) !== dateClicked.format(YYYY_MM_DD)
  ) {
    return [dateClicked];
  }

  // existing single date chosen, NOT same as date clicked, is range
  if (
    state.datesChosen.length === 1 &&
    dateClicked.format(YYYY_MM_DD) !==
      state.datesChosen[0].format(YYYY_MM_DD) &&
    state.isRange
  ) {
    if (dateClicked.unix() < state.datesChosen[0].unix()) {
      // dateClicked is prior to existing single date chosen
      return [dateClicked];
    }
    // dateClicked is after existing single date chosen
    return [...state.datesChosen, dateClicked];
  }

  // 2 existing dates chosen
  if (state.datesChosen.length === 2) {
    return [dateClicked];
  }

  // no conditions above match
  return [];
}

export function reducerSelectDates(state, action, closeOnSelection = true) {
  const nextDatesChosen = updateDatesChosen(action.payload, state);
  let nextShowCalendar;
  if (closeOnSelection) {
    nextShowCalendar = state.isRange
      ? !(nextDatesChosen.length === 2)
      : !(nextDatesChosen.length === 1);
  } else {
    nextShowCalendar = true;
  }
  const nextDateHovered = nextShowCalendar === false ? null : state.dateHovered;
  const nextVisibleDates = getDatesInView({
    ...state,
    dateHovered: nextDateHovered,
    datesChosen: nextDatesChosen
  });
  return {
    ...state,
    datesChosen: nextDatesChosen,
    showCalendar: nextShowCalendar,
    visibleDates: nextVisibleDates
  };
}

export function reducerToggleDatePicker(state) {
  return {
    ...state,
    showCalendar: !state.showCalendar
  };
}
