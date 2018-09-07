import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  return (
    <aside className={navClasses}>
      {/*
      NavMenu
        NavMenuLink title="..."
        NavMenuLink
        NavMenuLink
        NavMenuLink
        NavMenuLink

      NavFooter
        NavMenuLink title="Legal..." size="small"


    */}

      {/* TODO: Add <NavMenu /> */}
      <nav className={styles.Menu}>
        {/* TODO: Add <NavMenuItem /> */}
        <NavLink className={styles.Link} activeClassName={styles.LinkActive} to={`/about-the-cause`}>
          About Page
        </NavLink>
        <div className={styles.Link}>Second Page</div>
        <div className={styles.Link}>Third Page</div>
      </nav>
    </aside>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(mapStateToProps)(Nav);
