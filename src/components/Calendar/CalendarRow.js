import React from "react";
import CalendarDay from "./CalendarDay";
import CalendarPaddingDay from "./CalendarPaddingDay";
import PropTypes from 'prop-types';

export default function CalendarRow(props) {
  return (
    <div className="Calendar-row">
      {props.rowDays.map((day, index, readOnlyArray) => {
        return day.type === "day" ? (
          <CalendarDay
            {...day}
            onClick={props.clickSelectDate}
            onMouseOver={props.hoverSelectDate}
            onMouseOut={props.hoverOffDate}
            key={day.date.unix()}
            row={props.row}
          />
        ) : (
          <CalendarPaddingDay date={day.date} key={day.date.unix()} />
        );
      })}
    </div>
  );
}

CalendarRow.propTypes = {
  /** Array of dates with their states */
  rowDays: PropTypes.array.isRequired,

  /** For CalendarDay to handle clicks */
  clickSelectDate: PropTypes.func.isRequired,

  /** For CalendarDay to handl mouse overs */
  hoverSelectDate: PropTypes.func.isRequired,

  /** For CalendarDay to handl mouse outs */
  hoverOffDate: PropTypes.func.isRequired,
};
