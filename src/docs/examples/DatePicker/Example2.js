import React, { Component } from 'react';
import DatePicker from '@accessdev/arc-ui-react/DatePicker';
import moment from 'moment';

export default class DatePickerExample1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      datesChosen: [moment()]
    };
  }

  render() {
    return (
      <div>
        <h2>Single Date Example</h2>
        <button onClick={event => this.setState({ isOpen: !this.state.isOpen }) }>
          Toggle DatePicker{' '}
          {this.state.datesChosen[0] && this.state.datesChosen[0].format('YYYY-MM-DD')}
          {this.state.datesChosen[0] && this.state.datesChosen[1] ? ' - ' : null}
          {this.state.datesChosen[1] && this.state.datesChosen[1].format('YYYY-MM-DD')}
        </button>
        <DatePicker
          isOpen={this.state.isOpen}
          datesChosen={this.state.datesChosen}
          isRange={false}
          numberOfCalendars={2}
          onChange={datesArray => { this.setState({ datesChosen: datesArray })}}
          />
      </div>
    );
  }
}