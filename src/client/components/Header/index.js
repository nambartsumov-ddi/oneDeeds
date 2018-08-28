import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

import NavToggle from 'Components/Header/NavToggle';

const Header = ({ onClick }) => {
  return (
    <div className={styles.Header}>
      {/* <Logo /> */}
      <button onClick={onClick()}>LOGO</button>
      <NavToggle />
    </div>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
};

export default Header;
