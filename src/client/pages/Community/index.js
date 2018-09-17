import React from 'react';
import { connect } from 'react-redux';

import styles from './Community.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const Community = () => {
  return (
    <div className={styles.Community}>
      <NavToggle />
      <Logo />
      <div className={styles.Title}>Hello Community Page!</div>
    </div>
  );
};

export default connect()(Community);
