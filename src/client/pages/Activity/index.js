import React from 'react';
import { connect } from 'react-redux';

import styles from './Activity.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const Activity = () => {
  return (
    <div className={styles.Activity}>
      <NavToggle />
      <Logo />
      <div className={styles.Title}>Hello Activity Page!</div>
    </div>
  );
};

export default connect()(Activity);
