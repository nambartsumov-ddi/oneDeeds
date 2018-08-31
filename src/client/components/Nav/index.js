import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Nav.module.scss';

class Nav extends Component {
  render() {
    let styleLink = this.props.isOpen ? { opacity: '1', marginLeft: '0' } : {};

    return (
      <div className={styles.Nav + ' ' + (this.props.isOpen ? styles.navOpen : '')}>
        {/* <NavMenu /> */}
        <div className={styles.mainLinks}>
          {/* NavMenuItem */}
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
  }
}

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
