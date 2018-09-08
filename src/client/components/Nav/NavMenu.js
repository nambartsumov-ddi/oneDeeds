import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './NavMenu.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const NavMenu = ({ children }) => {
  const navMenuClasses = stylesCtx(styles.NavMenu);

  return <nav className={navMenuClasses}>{children}</nav>;
};

NavMenu.propTypes = {
  children: PropTypes.any,
};

export default NavMenu;
