import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const stylesCtx = classNames.bind(styles);

import styles from './LayoutButton.module.scss';

const LayoutButton = ({ type, text }) => {
  const buttonClasses = stylesCtx(styles.LayoutButton, {
    [styles.CharityButton]: type === 'Charity',
    [styles.DefaultButton]: type !== 'Charity',
  });
  return (
    <div className={styles.LayoutButtonWrapper}>
      <button className={buttonClasses}>
        <span>{text}</span>
      </button>
    </div>
  );
};

LayoutButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default LayoutButton;
