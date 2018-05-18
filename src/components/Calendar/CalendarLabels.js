import React from "react";
import { getCalendarLabels } from "./Calendar.utils";
import classNames from "classnames";

export default function CalendarLabels() {
  function getClassNames(day) {
    return classNames({
      "Calendar-label": true,
      "Calendar-label--weekend": day.isWeekend
    });
  }

  return (
    <div className="Calendar-labels">
      {getCalendarLabels().map(label => (
        <div className={getClassNames(label)} key={label.text}>
          {label.text.substring(0, 2)}
        </div>
      ))}
    </div>
  );
}
