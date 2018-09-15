import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './NavFooter.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavFooter = ({ children }) => {
  const navFooterClasses = stylesCtx(styles.NavFooter);

  return (
    <div className={navFooterClasses}>
      {children}
      <div className={styles.BottomRow}>
        <span className={styles.Rights}>© OneDeeds, 2018</span>
        <div className={styles.SocialIcons}>
          <svg width="32" height="32" viewBox="0 0 172.1 366.6" className={styles.Icon}>
            <path d="M114.1 365.6H38.7V183.3H1v-62.8h37.7V82.7C38.7 31.5 60 1 120.4 1h50.3v62.8h-31.4c-23.5 0-25.1 8.8-25.1 25.2l-.1 31.4h57l-6.7 62.8h-50.3v182.4z" />
          </svg>
          <svg width="32" height="32" viewBox="0 0 200 162.5" className={styles.Icon}>
            <path d="M200 19.2c-7.4 3.3-15.3 5.5-23.6 6.5 8.5-5.1 15-13.1 18-22.7-7.9 4.7-16.7 8.1-26.1 10-7.5-8-18.1-13-30-13-22.7 0-41 18.4-41 41 0 3.2.4 6.3 1.1 9.4-34.1-1.7-64.3-18-84.6-42.9-3.5 6.1-5.6 13.1-5.6 20.6 0 14.2 7.2 26.8 18.3 34.2-6.7-.2-13.1-2.1-18.6-5.1v.5c0 19.9 14.1 36.5 32.9 40.2-3.4.9-7.1 1.4-10.8 1.4-2.6 0-5.2-.3-7.7-.7 5.2 16.3 20.4 28.2 38.3 28.5-14 11-31.7 17.6-51 17.6-3.3 0-6.6-.2-9.8-.6 18.2 11.6 39.7 18.4 62.9 18.4 75.5 0 116.7-62.5 116.7-116.7 0-1.8 0-3.5-.1-5.3 8.2-5.8 15.2-13 20.7-21.3z" />
          </svg>
          <svg width="32" height="32" viewBox="0 0 487.7 487.7" className={styles.Icon}>
            <circle cx="243.8" cy="245.3" r="70.8" />
            <path d="M373.5 0H114.3C51.5 0 0 51.4 0 114.3v259.1c0 62.8 51.4 114.3 114.3 114.3h259.1c62.8 0 114.3-51.4 114.3-114.3V114.3C487.7 51.5 436.3 0 373.5 0zM243.8 354.5c-60.3 0-109.2-48.9-109.2-109.2s48.9-109.2 109.2-109.2S353 185 353 245.3s-48.9 109.2-109.2 109.2zm149.8-228.3c-17 0-30.7-13.7-30.7-30.7s13.7-30.7 30.7-30.7 30.7 13.7 30.7 30.7-13.7 30.7-30.7 30.7z" />
          </svg>
          <svg width="32" height="32" viewBox="0 0 28 28" className={styles.Icon}>
            <path d="M9.328 6.578v18.328c0 0.484-0.234 0.938-0.766 0.938-0.187 0-0.359-0.047-0.516-0.125l-7.266-3.641c-0.438-0.219-0.781-0.781-0.781-1.25v-17.813c0-0.391 0.187-0.75 0.609-0.75 0.25 0 0.469 0.125 0.688 0.234l7.984 4c0.016 0.016 0.047 0.063 0.047 0.078zM10.328 8.156l8.344 13.531-8.344-4.156v-9.375zM28 8.437v16.469c0 0.516-0.297 0.875-0.812 0.875-0.266 0-0.516-0.078-0.734-0.203l-6.891-3.437zM27.953 6.563c0 0.063-8.078 13.172-8.703 14.172l-6.094-9.906 5.063-8.234c0.172-0.281 0.484-0.438 0.812-0.438 0.141 0 0.281 0.031 0.406 0.094l8.453 4.219c0.031 0.016 0.063 0.047 0.063 0.094z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

NavFooter.propTypes = {
  children: PropTypes.any,
};

export default NavFooter;
