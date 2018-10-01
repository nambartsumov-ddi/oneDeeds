import React from 'react';
import classNames from 'classnames';

import styles from './NavMenu.module.scss';
import NavMenuLink from './NavMenuLink';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavMenu = () => {
  const navMenuClasses = stylesCtx(styles.NavMenu);

  return (
    <nav className={navMenuClasses}>
      <NavMenuLink title="Home" to={`/`} />
      <NavMenuLink title="Activity" to={`/activity`} />
      <NavMenuLink title="Our Community" to={`/our-community`} />
      <NavMenuLink title="About The Cause" to={`/about-the-cause`} />
      <NavMenuLink title="Donations" to={`/Donations`} />
      <NavMenuLink title="FAQ" to={`/frequently-asked-questions`} />
    </nav>
  );
};

export default NavMenu;
