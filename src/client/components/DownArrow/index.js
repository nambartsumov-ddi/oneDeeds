import React from 'react';
import classNames from 'classnames';

import styles from './DownArrow.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const DownArrow = () => {
  const downArrowSVGClasses = stylesCtx(styles.Icon, styles.DownIcon);

  return (
    <div className={styles.DownIconWrapper}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={downArrowSVGClasses}>
        <use xlinkHref="#icon-circle-down" />
        <path d="M32 16c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zM3 16c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13-13-5.82-13-13z" />
        <path d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z" />
      </svg>
    </div>
  );
};

export default DownArrow;
