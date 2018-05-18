import React from "react";
import CalendarRow from "./CalendarRow";
import CalendarLabels from "./CalendarLabels";
import CalendarIncrementor from "./CalendarIncrementor";
import PropTypes from 'prop-types';

export default function Calendar(props) {
  function getRowText(index, arrayLength) {
    if (index === 0) {
      return "first";
    } else if (index === arrayLength - 1) {
      return "last";
    }

    return "middle";
  }

  return (
    <div className="Calendar">
      <CalendarIncrementor
        numberOfCalendars={props.numberOfCalendars}
        calendarIndex={props.index}
        clickHandler={props.clickCalendarIncrementor}
        direction="backward"
      />
      <CalendarIncrementor
        numberOfCalendars={props.numberOfCalendars}
        calendarIndex={props.index}
        clickHandler={props.clickCalendarIncrementor}
        direction="forward"
      />
      <div className="Calendar-name">
        {props.month[0][6].date.format("MMMM YYYY")}
      </div>
      <CalendarLabels />
      {props.month.map((week, rowIndex, readOnlyArray) => (
        <CalendarRow
          clickSelectDate={props.clickSelectDate}
          key={rowIndex}
          rowDays={week}
          row={getRowText(rowIndex, readOnlyArray.length)}
          hoverSelectDate={props.hoverSelectDate}
          hoverOffDate={props.hoverOffDate}
        />
      ))}
    </div>
  );
}

Calendar.propTypes = {
  /** Function to handle calendar incrementor clicks */
  clickCalendarIncrementor: PropTypes.func.isRequired,

  /** Function to handle the click of a day */
  clickSelectDate: PropTypes.func.isRequired,

  /** Function to handle mouse out of a day */
  hoverOffDate: PropTypes.func.isRequired,

  /** Index of calendar when there are mulptiple */
  index: PropTypes.number.isRequired,

  /** Function to handle mouse over of a day */
  hoverSelectDate: PropTypes.func.isRequired,

  /** Array of calendar weeks in month */
  month: PropTypes.array.isRequired,

  /** Number of calendars simultaneously visible */
  numberOfCalendars: PropTypes.number.isRequired,
};
