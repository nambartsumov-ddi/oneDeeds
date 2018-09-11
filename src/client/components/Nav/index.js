import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import NavMenu from './NavMenu';
import NavFooter from './NavFooter';

import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  return (
    <aside className={navClasses}>
      <NavMenu />
      <NavFooter>
        <NavLink className={styles.Small} to={`/`}>
          Legal Terms
        </NavLink>
      </NavFooter>
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
