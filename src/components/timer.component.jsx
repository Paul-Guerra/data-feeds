import React from 'react';
import PropTypes from 'prop-types';

export default function Timer({ time }) {
  return (
    <div className="timer">
      {time}
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.string.isRequired
};
