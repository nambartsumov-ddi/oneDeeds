import React from 'react';
import { connect } from 'react-redux';

import styles from './About.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const About = () => {
  return (
    <div className={styles.About}>
      <NavToggle />
      <Logo />
      <div>Hello About Page!</div>
    </div>
  );
};

export default connect()(About);
