import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { closeNav } from 'Actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';
import LogoSrc from 'Assets/Logo_transparent.png';

const Logo = ({ closeNav }) => {
  return (
    <Link onClick={() => closeNav()} to={'/'} className={styles.Logo}>
      <img src={LogoSrc} />
    </Link>
  );
};

Logo.propTypes = {
  closeNav: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav }, dispatch);
};

export default connect(
  undefined,
  mapDispatchToProps
)(Logo);
