import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

export default function CalendarIncrementor(props) {
  const buttonClass = classNames({
    "Calendar-incrementor": true,
    "Calendar-incrementor--forward": props.direction === "forward",
    "is-onlyCalendar": props.numberOfCalendars === 1,
    "is-firstCalendar": props.calendarIndex === 0,
    "is-leftAndBefore":
      props.calendarIndex % 2 === 0 && props.direction === "backward",
    "is-rightAndAfter":
      props.calendarIndex % 2 === 1 && props.direction === "forward"
  });
  const iconClass = classNames({
    "MonthNavigator-icon zmdi": true,
    "zmdi-chevron-left": props.direction === "backward",
    "zmdi-chevron-right": props.direction === "forward"
  });
  return (
    <button
      className={buttonClass}
      onClick={event => props.clickHandler(props.direction)}
    >
      <span className={iconClass} />
    </button>
  );
}

CalendarIncrementor.propTypes = {
  /** Direction to move calendars, forward/backward */
  direction: PropTypes.string.isRequired,

  /** Function called on click, callback is provided the direction as its only argument */
  clickHandler: PropTypes.func.isRequired,
};
