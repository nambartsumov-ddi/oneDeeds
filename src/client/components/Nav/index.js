import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import api from 'Api';
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

  const cancelMembershipHandler = () => {
    api
      .post('/cancel-membership', { user })
      .then(() => {
        logout();
        setUser();
        closeNav();
      })
      .catch((err) => {
        console.log('Failed to cancel membership. Try again in a few minutes.', err);
      });
  };

  const isUserSet = user ? !!Object.keys(user).length : false;

  const isUsedPaid = user && user.isPaid;

  return (
    <aside className={navClasses}>
      <NavMenu />
      <NavFooter>
        <div>
          {isUserSet && (
            <NavLink className={styles.Small} onClick={() => logoutHandler()} to={`/`}>
              Restart Registration
            </NavLink>
          )}

          {isUsedPaid && (
            <NavLink className={styles.Small} onClick={() => cancelMembershipHandler()} to={`/`}>
              Cancel Membership
            </NavLink>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <a
            className={styles.Small}
            href="https://www.onedeeds.com/toc02.pdf"
            target="_blank"
            rel="noopener noreferrer">
            Terms of Service
          </a>
          <a
            className={styles.Small}
            href="https://www.onedeeds.com/pp02.pdf"
            target="_blank"
            rel="noopener noreferrer">
            Privacy Policy
          </a>
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
