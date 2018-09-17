import React from 'react';
import { connect } from 'react-redux';

import styles from './FAQ.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const FAQ = () => {
  return (
    <div className={styles.FAQ}>
      <NavToggle />
      <Logo />
      <div className={styles.Title}>Hello FAQ Page!</div>
    </div>
  );
};

export default connect()(FAQ);
