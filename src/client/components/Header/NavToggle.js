import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './NavToggle.module.scss';

import { toggleNav } from 'Actions';

class NavToggle extends Component {
  render() {
    return (
      <div className={this.props.isOpen ? styles.navOpen : styles.NavToggle} onClick={this.props.toggleNav}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    );
  }
}

// const NavToggle = ({ toggleNav }) => {
//   return (
//     <div className={this.props.isOpen ? styles.navOpen : styles.NavToggle} onClick={() => toggleNav()}>
//       <span className={styles.line} />
//       <span className={styles.line} />
//       <span className={styles.line} />
//     </div>
//   );
// };

NavToggle.propTypes = {
  toggleNav: PropTypes.func,
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavToggle);
