import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Layout.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Layout = ({ isOpen, children }) => {
  const layoutClasses = stylesCtx(styles.Layout, {
    [styles.navOpen]: isOpen,
  });

  return <div className={layoutClasses}>{children}</div>;
};

Layout.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(mapStateToProps)(Layout);
