import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { closeNav } from 'Actions';
import NavMenu from './NavMenu';
import NavFooter from './NavFooter';
import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen, closeNav }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  return (
    <aside className={navClasses}>
      <NavMenu />
      <NavFooter>
        <NavLink className={styles.Small} onClick={() => closeNav()} to={`/`} activeClassName={styles.LinkActive}>
          Legal Terms
        </NavLink>
      </NavFooter>
    </aside>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool,
  closeNav: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
