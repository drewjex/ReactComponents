import React from "react";
import PropTypes from 'prop-types';
import './CalendarDay.css';

export default function CalendarPaddingDay(props) {
  return (
    <span
      className="CalendarDay CalendarDay--padding"
      data-date={props.date.format("YYYY-MM-DD")}
    />
  );
}

CalendarPaddingDay.propTypes = {
  /** Date represented by this padding day */
  date: PropTypes.object.isRequired,
};
