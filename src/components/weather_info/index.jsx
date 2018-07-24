import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import WeaatherIcon from '../weather_icon';

const ICONS = {
  temperature: 'thermometer',
  humidity: 'humidity',
  pressure: 'barometer',
  precipitation: 'rain',
  windSpeed: 'windy',
  windGust: 'windy',
  battery: 'earthquake',
  windDirection: 'wind-direction',
};

const WeatherInfo = ({ data, input }) => (
  <div className="weather">
    <WeaatherIcon name={ICONS[input.name]} color="blue" />
    <br />
    <span className="title">{input.shortName}</span>
    <br />
    <span className="data">
      {data[input.name] >= 0 ? data[input.name].toLocaleString() : data[input.name]}
    </span>
    <span className="unit">{input.unit}</span>
  </div>
);

WeatherInfo.propTypes = {
  data: PropTypes.shape({

  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
};


export default WeatherInfo;
