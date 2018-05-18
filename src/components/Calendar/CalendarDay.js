import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

export default function CalendarDay(props) {
  const buttonClasses = classNames({
    CalendarDay: true,
    "CalendarDay--hovered": props.isHovered,
    "CalendarDay--rangeStart": props.placeInRange === "beginning",
    "CalendarDay--rangeMiddle": props.placeInRange === "middle",
    "CalendarDay--rangeEnd": props.placeInRange === "end"
  });

  const spanClasses = classNames({
    "CalendarDay-content": true,
    "CalendarDay-content--chosen": props.isChosen,
    "CalendarDay-content--hovered": props.isHovered && !props.isDisabled,
    "CalendarDay-content--rangeStart": props.placeInRange === "beginning",
    "CalendarDay-content--rangeMiddle": props.placeInRange === "middle",
    "CalendarDay-content--rangeEnd": props.placeInRange === "end",
    "is-today": props.isToday
  });

  return (
    <button
      className={buttonClasses}
      disabled={props.isDisabled ? "disabled" : false}
      onClick={event => props.onClick(props.date)}
      onMouseOver={event => props.onMouseOver(props.date)}
      onMouseOut={event => props.onMouseOut(props.date)}
      type="button"
      value={props.date.format("YYYY-MM-DD")}
    >
      <span className={spanClasses}>{props.date.format("D")}</span>
    </button>
  );
}

CalendarDay.propTypes = {
  /** Moment date type for showing user the date and providing info on click */
  date: PropTypes.object.isRequired,

  /** Show user if day is in their chosen list */
  isChosen: PropTypes.bool,

  /** Show user they can't interact with this day */
  isDisabled: PropTypes.bool,

  /** Show user our custom hover effect */
  isHovered: PropTypes.bool,

  /** Show user that this date is today */
  isToday: PropTypes.bool,

  /** For styling the range effect */
  placeInRange: PropTypes.string,

  /** Handles clicks, passes date to callback */
  onClick: PropTypes.func.isRequired,

  /** Handle mouse overs, passes date to callback */
  onMouseOver: PropTypes.func.isRequired,

  /** Handle mouse outs, passes date to callback */
  onMouseOut: PropTypes.func.isRequired
};
