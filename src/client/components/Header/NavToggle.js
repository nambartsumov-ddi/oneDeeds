import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './NavToggle.module.scss';

import { toggleNav } from 'Actions';

const NavToggle = ({ toggleNav }) => {
  return (
    <div className={styles.NavToggle} onClick={() => toggleNav()}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  );
};

NavToggle.propTypes = {
  toggleNav: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(NavToggle);
