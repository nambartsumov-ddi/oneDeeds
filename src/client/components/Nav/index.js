import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen }) => {
  const styleLink = isOpen ? { opacity: '1', marginLeft: '0' } : {};

  const NavClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  return (
    <div className={NavClasses}>
      {/* TODO: Add <NavMenu /> */}
      <div className={styles.mainLinks}>
        {/* TODO: Add <NavMenuItem /> */}
        <div className={styles.link} style={styleLink}>
          First Page
        </div>
        <div className={styles.link} style={styleLink}>
          Second Page
        </div>
        <div className={styles.link} style={styleLink}>
          Third Page
        </div>
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
