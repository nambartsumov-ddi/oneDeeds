import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './NavFooter.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavFooter = ({ children }) => {
  const navFooterClasses = stylesCtx(styles.NavFooter);

  return (
    <div className={navFooterClasses}>
      {children}
      <div className={styles.BottomRow}>
        <NavLink className={styles.Small} onClick={() => closeNav()} to={`/`} activeClassName={styles.LinkActive}>
          Legal Terms
        </NavLink>
        <span className={styles.Rights}>© OneDeeds, 2018</span>
      </div>
    </div>
  );
};

NavFooter.propTypes = {
  children: PropTypes.any,
};

export default NavFooter;
