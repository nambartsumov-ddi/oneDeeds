import React from 'react';
import { connect } from 'react-redux';

import styles from './About.module.scss';

import NavToggle from 'Components/NavToggle';
import Nav from 'Components/Nav';
import Logo from 'Components/Logo';

const About = () => {
  return (
    <div className={styles.About}>
      <NavToggle />
      <Logo />
      <Nav />
      <div>Hello About Page!</div>
    </div>
  );
};

export default connect()(About);
