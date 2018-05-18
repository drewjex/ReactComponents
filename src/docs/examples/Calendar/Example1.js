import React from 'react';
import Calendar from '@accessdev/arc-ui-react/Calendar';
import { createMonth, getDefaultState } from '@accessdev/arc-ui-react/Calendar/Calendar.utils';
import moment from 'moment';

export default function CalendarExample1() {
  let month = createMonth(moment(), getDefaultState());
  return (
    <Calendar
      clickCalendarIncrementor={direction => console.log(`incrementor click direction ${direction}`)}
      clickSelectDate={date => console.log(`date clicked ${date}`)}
      hoverOffDate={date => console.log(`date mouse out ${date}`)}
      index={0}
      hoverSelectDate={date => console.log(`date mouse over ${date}`)}
      month={month}
      numberOfCalendars={1}
    />
  );
}