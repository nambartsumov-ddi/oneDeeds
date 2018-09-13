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
      <NavMenuLink title="The Acceptance Ring" to={`/about-the-cause`} />
    </nav>
  );
};

export default NavMenu;
