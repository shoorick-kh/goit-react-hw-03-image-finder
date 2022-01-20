import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onClickMore }) {
  return (
    <button className={s.Button} type="button" onClick={onClickMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClickMore: PropTypes.func.isRequired,
};
