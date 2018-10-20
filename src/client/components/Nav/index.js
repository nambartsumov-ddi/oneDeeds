import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { closeNav, logout, setUser } from 'Actions';
import NavMenu from './NavMenu';
import NavFooter from './NavFooter';
import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen, user, closeNav, logout, setUser }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  const logoutHandler = () => {
    logout();
    setUser();
    closeNav();
  };

  const isUserSet = user ? !!Object.keys(user).length : false;

  return (
    <aside className={navClasses}>
      <NavMenu />
      <NavFooter>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <NavLink className={styles.Small} onClick={() => closeNav()} to={`/`}>
            Legal Terms
          </NavLink>
          {isUserSet && (
            <NavLink className={styles.Small} onClick={() => logoutHandler()} to={`/`}>
              Logout
            </NavLink>
          )}
        </div>
      </NavFooter>
    </aside>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.any,
  closeNav: PropTypes.func,
  logout: PropTypes.func,
  setUser: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav, logout, setUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
