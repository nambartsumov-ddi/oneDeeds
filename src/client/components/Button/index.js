import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Button = ({ text, className }) => {
  const buttonClasses = stylesCtx(styles.Button, {
    [className]: className,
  });
  return (
    <div className={styles.ButtonWrapper}>
      <button className={buttonClasses}>
        <span>{text}</span>
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
