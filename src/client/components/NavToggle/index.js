import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './NavToggle.module.scss';
import { toggleNav } from 'Actions';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavToggle = ({ isNavOpen, toggleNav, page }) => {
  const barWrapperClasses = stylesCtx(styles.BarWrapper, {
    [styles.Open]: isNavOpen,
    [styles.LinkActive]: page !== undefined,
  });

  const navToggleClasses = stylesCtx(styles.NavToggle);

  return (
    <div className={navToggleClasses} onClick={toggleNav}>
      <div className={barWrapperClasses}>
        <span className={styles.Bar} />
        <span className={styles.Bar} />
        <span className={styles.Bar} />
      </div>
    </div>
  );
};

NavToggle.propTypes = {
  toggleNav: PropTypes.func,
  isNavOpen: PropTypes.bool,
  page: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.ui.isNavOpen,
    isVideodPlaying: state.ui.isVideodPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavToggle);
