import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen, ...rest }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  console.log(rest);

  return (
    <div className={navClasses}>
      {/* TODO: Add <NavMenu /> */}
      <div className={styles.Menu}>
        {/* TODO: Add <NavMenuItem /> */}
        <NavLink
          className={styles.MenuLink}
          isActive={() => true}
          activeClassName={styles.MenuLinkActive}
          to={`/about-the-cause`}>
          About Page
        </NavLink>
        <div className={styles.MenuLink}>Second Page</div>
        <div className={styles.MenuLink}>Third Page</div>
      </div>
    </div>
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

export default connect(
  mapStateToProps,
  null
)(Nav);
