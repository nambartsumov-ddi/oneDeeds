import React from 'react';
import { connect } from 'react-redux';

import styles from './About.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

const About = () => {
  return (
    <div className={styles.About}>
      <div className={styles.FixedHeader} />
      <NavToggle />
      <Logo />
      <div className={styles.ContentWrapper}>
        <img className={styles.AboutImg} />
        <div className={styles.AboutPageContent}>
          <h2>
            About The <span>Cause</span>
          </h2>
          <div className={styles.BottomLine} />
          <p>
            Our mission is to make everyone feel welcome and accepted no matter who you are. It’s this focus that has
            brought our attention to the LGBTQI community and the support needed for marriage equality in Australia.
            <br />
            <br />
            We see marriage as a fundamental part of belonging and, while we know Australians accept marriage equality,
            we are determined to help empower change to ensure all Australians have the right to marry the person they
            love.
            <br />
            <br />
            We now look to you, your hand and this ring to help us lead the way. When we stand together, we can make a
            big difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect()(About);
