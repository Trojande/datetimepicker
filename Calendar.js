import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import range from 'lodash/range';
import classNames from 'classnames';

export default class Calendar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      valueToShow: null,
    };
    this.today = moment().startOf('date');
  }
  componentWillMount() {
    this.setState({
      valueToShow: this.props.value
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value.format() !== nextProps.value.format()) {
      this.setState({
        valueToShow: nextProps.value,
      });
    }
  }
  onChangeHandler = (e) => {
    const { day } = e.currentTarget.dataset;
    const {
      onChange,
      value
    } = this.props;
    const { valueToShow } = this.state;
    onChange(valueToShow.clone()
      .set('date', day)
      .set('hour', value.get('hour'))
      .set('minute', value.get('minute')) // если время поменяли в другом компоненте
    );
  };
  nextMonthHandler = () => {
    this.setState({
      valueToShow: this.state.valueToShow.clone().add(1, 'month'),
    });
  };
  prevMonthHandler = () => {
    this.setState({
      valueToShow: this.state.valueToShow.clone().add(-1, 'month'),
    });
  };
  render() {
    const { value } = this.props;
    const { valueToShow } = this.state;
    const isCurrentMonth =
      valueToShow.get('month') === value.get('month') &&
      valueToShow.get('year') === value.get('year');
    const currentDay = value.get('date');
    return (
      <div className="calendar">
        <div className="calendar__month">
          <ul className="calendar__month-list">
            <li
              className="calendar__month-item calendar__month-item_prevbutton"
              onClick={this.prevMonthHandler}
            >
              &#10094;
            </li>
            <li
              className="calendar__month-item calendar__month-item_nextbutton"
              onClick={this.nextMonthHandler}
            >
              &#10095;
            </li>
            <li className="calendar__month-item">
              {valueToShow.format('MMMM')}
              <span className="calendar__year">
                {valueToShow.format('YYYY')}
              </span>
            </li>
          </ul>
        </div>
        <ul className="calendar__weekdays">
          <li className="calendar__weekday">Пн</li>
          <li className="calendar__weekday">Вт</li>
          <li className="calendar__weekday">Ср</li>
          <li className="calendar__weekday">Чт</li>
          <li className="calendar__weekday">Пт</li>
          <li className="calendar__weekday">Сб</li>
          <li className="calendar__weekday">Вс</li>
        </ul>
        <ul className="calendar__days">
          {range(1, valueToShow.clone().set('date', 1).get('day')).map(day => (
            <li className="calendar__day" key={`calendar__fake-day-${day}`} />
          ))}

          {range(1, valueToShow.daysInMonth() + 1)
            .map(day => (
              <li
                className={classNames('calendar__day', {
                  calendar__day_forbidden: valueToShow.clone().set('date', day).isBefore(this.today)
                })}
                onClickCapture={!valueToShow.clone()
                  .set('date', day)
                  .startOf('date')
                  .isBefore(this.today) ? this.onChangeHandler : null
                }
                data-day={day}
                key={`calendar__day-${day}`}
              >
                {
                  <span
                    className={classNames('calendar__day-text', {
                      'calendar__day-text_active': isCurrentMonth && day === currentDay,
                      'calendar__day-text_forbidden': valueToShow.clone()
                        .set('date', day)
                        .startOf('date')
                        .isBefore(this.today),
                    })}
                    key={`calendar__day-text-${day}`}
                  >
                    {day}
                  </span>
                }
              </li>
          ))}
        </ul>
      </div>
    );
  }
}
Calendar.propTypes = {
  value: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
};

