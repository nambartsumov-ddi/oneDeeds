import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { closeNav } from 'Actions';

import styles from './Overlay.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Overlay = ({ isOpen, closeNav }) => {
  const overlayClasses = stylesCtx(styles.Overlay, {
    [styles.overlayOpen]: isOpen,
  });

  return <div className={overlayClasses} onClick={closeNav} />;
};

Overlay.propTypes = {
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
)(Overlay);
