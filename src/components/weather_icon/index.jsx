import React from 'react';
import PropTypes from 'prop-types';

const WeaatherIcon = ({ name, color }) => (
  <i
    className={`wi wi-${name} ${color}-text`}
  />
);

WeaatherIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

WeaatherIcon.defaultProps = {
  color: '',
};

export default WeaatherIcon;
