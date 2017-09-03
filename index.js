import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import TimePicker from './TimePicker';

export default class DateTimePicker extends Component {
  constructor(...args) {
    super(...args);
    this.mainContainerRef = null;
    this.state = {
      isPickerVisible: false
    };
    this._mounted = false;
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOut, false);
    this._mounted = true;
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown');
    this._mounted = false;
  }
  getMainContainerRef = ref => this.mainContainerRef = ref;
  clickOut = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (e && e.target && e.target.classList && !e.target.classList.contains('date-time-picker__input') &&
      path &&
      !path.includes(this.mainContainerRef) &&
      this._mounted) {
      this.closeWidget();
    }
  };
  closeWidget = () => {
    this.setState({
      isPickerVisible: false,
    });
  };
  showData = () => {
    if (!this.state.isPickerVisible) {
      this.setState({
        isPickerVisible: true
      });
    }
  };
  render() {
    return (
      <div
        className="date-time-picker"
        ref={this.getMainContainerRef}
      >
        <input
          type="text"
          className="date-time-picker__input"
          value={moment(this.props.value).format('DD.MM.YYYY HH:mm')}
          onClickCapture={this.showData}
        />
        <div
          className={classNames('date-time-picker__picker', {
            'date-time-picker__picker_visible': this.state.isPickerVisible,
          })}
        >
          <div className="date-time-picker__container">
            <Calendar
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <TimePicker
              value={this.props.value}
              onChange={this.props.onChange}
            />
          </div>
        </div>

      </div>
    );
  }

}
DateTimePicker.propTypes = {
  value: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
};

