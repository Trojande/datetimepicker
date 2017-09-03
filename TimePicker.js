import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TimePicker extends Component {


  timeChange = (what, how) => {
    const {
      onChange,
      value
    } = this.props;
    onChange(value
      .clone()
      .set(what, how)
    );
  };
  timeChangeHander = (e) => {
    const {
      what,
      how
    } = e.target.dataset;
    const { value } = this.props;
    this.timeChange(what, value.clone().add(+how, what).get(what));
  };
  timeChangeManually = (e) => {
    const { what } = e.target.dataset;
    const value = +e.target.value;
    if (
      (value >= 0 && value < 60 && what === 'minute') ||
      (value >= 0 && value < 24 && what === 'hour')
    ) this.timeChange(what, value);
  };
  render() {
    const { value } = this.props;
    return (
      <div className="time-picker">
        <div className="time-picker__counter">
          <div
            className="time-picker__button"
            data-what="hour"
            data-how="1"
            onClick={this.timeChangeHander}
          >
            ▲
          </div>
          <div className="time-picker__value">
            <input
              type="number"
              className="time-picker__input"
              data-what="hour"
              value={value.format('HH')}
              onChange={this.timeChangeManually}
            />
          </div>
          <div
            className="time-picker__button"
            data-what="hour"
            data-how="-1"
            onClick={this.timeChangeHander}
          >
            ▼
          </div>
        </div>
        <div className="time-picker__counter">
          <div
            className="time-picker__button"
            data-what="minute"
            data-how="1"
            onClick={this.timeChangeHander}
          >
            ▲
          </div>
          <div className="time-picker__value">
            <input
              type="number"
              className="time-picker__input"
              data-what="minute"
              value={value.format('mm')}
              onChange={this.timeChangeManually}
            />
          </div>
          <div
            className="time-picker__button"
            data-what="minute"
            data-how="-1"
            onClick={this.timeChangeHander}
          >
            ▼
          </div>
        </div>
      </div>
    );
  }
}
TimePicker.propTypes = {
  value: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
};
