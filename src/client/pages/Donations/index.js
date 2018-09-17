import React from 'react';
import { connect } from 'react-redux';

import styles from './Donations.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const Donations = () => {
  return (
    <div className={styles.Donations}>
      <NavToggle />
      <Logo />
      <div className={styles.Title}>Hello Donations Page!</div>
    </div>
  );
};

export default connect()(Donations);
