import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { closeNav } from 'Actions';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './NavMenuLink.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavMenuLink = ({ title, size, to, closeNav }) => {
  const navMenuLinkClasses = stylesCtx(styles.NavMenuLink, {
    [styles.Small]: size === 'Small',
  });

  return (
    <NavLink
      className={navMenuLinkClasses}
      onClick={() => closeNav()}
      activeClassName={styles.LinkActive}
      exact
      to={to}>
      {title}
    </NavLink>
  );
};

NavMenuLink.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  to: PropTypes.string,
  closeNav: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav }, dispatch);
};

export default withRouter(
  connect(
  undefined,
  mapDispatchToProps
  )(NavMenuLink)
);
