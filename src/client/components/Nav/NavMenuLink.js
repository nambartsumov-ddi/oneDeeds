import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './NavMenuLink.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const NavMenuLink = ({ title, size }) => {
  const navMenuLinkClasses = stylesCtx(styles.NavMenuLink, {
    [styles.Small]: size === 'Small',
  });

  return (
    <NavLink className={navMenuLinkClasses} activeClassName={styles.LinkActive} to={`/about-the-cause`}>
      {title}
    </NavLink>
  );
};

NavMenuLink.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
};

export default NavMenuLink;
