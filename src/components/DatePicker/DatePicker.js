import React, { Component } from "react";
import Calendar from "../Calendar";
import {
  getDatesInView,
  getIncrementedFocusDate,
  updateDatesChosen
} from "./DatePicker.utils";
import { isDayDisabled } from '../Calendar/Calendar.utils';
import moment from "moment";
import classNames from "classnames";
import PropTypes from 'prop-types';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    const initFocusDate = this.props.focusDate || moment();
    const initDateHovered = null;
    const initDatesChosen = [];

    this.state = {
      dateHovered: initDateHovered,
      datesChosen: initDatesChosen,
      focusDate: initFocusDate,
      isRange: this.props.isRange,
      visibleDates: getDatesInView({
        ...this.props,
        dateHovered: initDateHovered,
        datesChosen: initDatesChosen,
        focusDate: initFocusDate
      })
    };

    this.clickCalendarIncrementor = this.clickCalendarIncrementor.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hoverOffDate = this.hoverOffDate.bind(this);
    this.hoverSelectDate = this.hoverSelectDate.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.showCalendar) {
      document.addEventListener("click", this.handleClickOutside);
    } else {
      document.removeEventListener("click", this.handleClickOutside);
    }
  }

  clickCalendarIncrementor(direction) {
    const newFocusDate = getIncrementedFocusDate(
      this.state.focusDate,
      direction
    );
    const newVisibleDates = getDatesInView({
      ...this.getStateForUtils(),
      focusDate: newFocusDate
    });
    this.setState({
      focusDate: newFocusDate,
      visibleDates: newVisibleDates
    });
  }

  getStateForUtils(focusDate = this.state.focusDate) {
    const result = {
      ...this.props,
      ...this.state,
      focusDate
    };
    return result;
  }

  getDropdownClasses() {
    const result = classNames({
      "DatePicker-dropdown": true,
      "is-singleCalendarOnly": this.props.numberOfCalendars === 1
    });
    return result;
  }

  handleClickOutside(event) {
    if (
      this.dropdownElement &&
      !this.dropdownElement.contains(event.target) &&
      this.props.closeDatePicker
    ) {
      this.props.closeDatePicker();
    }
  }

  hoverOffDate() {
    console.log('hover off date from date picker');
    this.setState({
      dateHovered: null,
      visibleDates: getDatesInView({
        ...this.getStateForUtils(),
        dateHovered: null
      })
    });
  }

  hoverSelectDate(date) {
    console.log('hover select date from date picker');
    if (isDayDisabled(date, this.getStateForUtils())) {
      return;
    }

    this.setState({
      dateHovered: date,
      visibleDates: getDatesInView({
        ...this.getStateForUtils(),
        dateHovered: date,
        datesChosen: this.state.datesChosen
      })
    });
  }

  selectDate(date) {
    console.log('select date from date picker');
    const nextDatesChosen = updateDatesChosen(date, this.state);
    const nextDateHovered = null;
    const nextVisibleDates = getDatesInView({
      ...this.state,
      datesChosen: nextDatesChosen,
      dateHovered: nextDateHovered
    });
    this.setState({
      datesChosen: nextDatesChosen,
      dateHovered: nextDateHovered,
      visibleDates: nextVisibleDates
    });

    if (this.props.onChange && typeof this.props.onChange === "function") {
      this.props.onChange(nextDatesChosen);
    }
  }

  render() {
    return (
      <div className="DatePicker">
        {!this.props.isOpen ? null : (
          <div
            ref={node => (this.dropdownElement = node)}
            className={this.getDropdownClasses()}
          >
            <div className="DatePicker-calendars">
              {this.state.visibleDates.map((month, index) => (
                <Calendar
                  index={index}
                  key={index}
                  state={this.getStateForUtils(month[0][6].date)}
                  month={this.state.visibleDates[index]}
                  clickCalendarIncrementor={this.clickCalendarIncrementor}
                  clickSelectDate={this.selectDate}
                  hoverSelectDate={this.hoverSelectDate}
                  hoverOffDate={this.hoverOffDate}
                  numberOfCalendars={this.props.numberOfCalendars}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

DatePicker.propTypes = {

  datesChosen: PropTypes.array.isRequired,

  isOpen: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,

  /** Moment date to guarantee is visible the first time the date picker opens */
  focusDate: PropTypes.object,

  isRange: PropTypes.bool,

  numberOfCalendars: PropTypes.number,
};

DatePicker.defaultProps = {
  isRange: false,
  numberOfCalendars: 1,
  focusDate: moment(),
};
