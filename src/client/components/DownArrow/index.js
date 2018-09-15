import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './DownArrow.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const DownArrow = ({ onClick }) => {
  const downArrowSVGClasses = stylesCtx(styles.Icon, styles.DownIcon);

  return (
    <div className={styles.DownIconWrapper} onClick={() => onClick()}>
      <a className={downArrowSVGClasses}>
        <svg width="38" viewBox="0 0 140 141.8" height="38" focusable="false" aria-hidden="true" tabIndex="-1">
          <path
            fill="#fff"
            d="M93.3 134.8c19.8-7 35.2-22.3 42.3-42.1 2.7-7.5 4.1-15.5 4.1-23.6 0-8-1.4-15.9-4-23.4-7.1-19.8-22.5-35.1-42.4-42.2-.9-.3-1.8-.3-2.7.1-.8.4-1.5 1.1-1.8 2s-.3 1.8.1 2.7c.4.8 1.1 1.5 2 1.8 17.8 6.3 31.7 20.2 38.1 38 2.5 6.8 3.7 13.8 3.7 21 0 7.3-1.2 14.4-3.7 21.2-6.4 17.7-20.2 31.5-38 37.8-6.7 2.4-13.7 3.6-20.9 3.6-7.3 0-14.5-1.2-21.3-3.7-17.6-6.4-31.3-20.1-37.6-37.7-2.4-6.8-3.7-13.9-3.7-21.2 0-7.2 1.2-14.3 3.6-21 6.3-17.7 20-31.5 37.7-37.8 1.8-.7 2.8-2.7 2.1-4.5-.3-.9-1-1.6-1.8-2s-1.8-.4-2.7-.1C26.8 10.8 11.5 26.1 4.5 45.8c-2.7 7.5-4 15.4-4 23.4 0 8.1 1.4 16 4.1 23.6 7 19.6 22.3 34.8 41.8 41.9 7.6 2.7 15.5 4.1 23.7 4.1 8-.1 15.8-1.4 23.2-4z"
          />
          <path
            fill="#fff"
            d="M46.8 58.7c-1.4 1.4-1.3 3.6 0 4.9L66.4 83l.2.2c1 .8 2.2 1.3 3.5 1.3s2.5-.4 3.5-1.3l.2-.2 19.6-19.4c.7-.7 1-1.5 1-2.5 0-.9-.4-1.8-1-2.5-1.4-1.4-3.6-1.4-4.9 0L70.1 76.8 51.7 58.6c-1.4-1.3-3.6-1.3-4.9.1z"
          />
        </svg>
      </a>
    </div>
  );
};

DownArrow.propTypes = {
  onClick: PropTypes.func,
};

export default DownArrow;
