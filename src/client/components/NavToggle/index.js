import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './NavToggle.module.scss';
import { toggleNav } from 'Actions';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const NavToggle = ({ isNavOpen, toggleNav, isClickedPlayButton }) => {
  const barWrapperClasses = stylesCtx(styles.BarWrapper, {
    [styles.Open]: isNavOpen,
  });

  const navToggleClasses = stylesCtx(styles.NavToggle, {
    [styles.videoOpen]: isClickedPlayButton,
  });

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
  isClickedPlayButton: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.ui.isNavOpen,
    isClickedPlayButton: state.ui.isClickedPlayButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavToggle);
