import React from 'react';

import styles from './Header.module.scss';

import NavToggle from 'Components/Header/NavToggle';

const Header = () => {
  return (
    <div className={styles.Header}>
      {/* <Logo /> */}
      <div>LOGO</div>
      <NavToggle />
    </div>
  );
};

export default Header;
