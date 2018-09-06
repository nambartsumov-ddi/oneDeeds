import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './NavToggle.module.scss';
import { toggleNav } from 'Actions';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const NavToggle = ({ isNavOpen, toggleNav }) => {
  const barWrapperClasses = stylesCtx(styles.BarWrapper, {
    [styles.Open]: isNavOpen,
  });

  return (
    <div className={styles.NavToggle} onClick={toggleNav}>
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
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.ui.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavToggle);
