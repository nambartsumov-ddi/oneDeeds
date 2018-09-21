import React from 'react';

import Steps from 'Components/Steps';
import Email from 'Components/Email';

import styles from './Registration.module.scss';

const Registration = () => {
  return (
    <div className={styles.Registration}>
      <h1 className={styles.Title}>Registration</h1>
      <Steps />
      <Email />
      <span className={styles.Or}>Or</span>
      <div className={styles.SocialBtnWrapper}>
        <a href="/auth/facebook">Facebook</a>
        <a href="/auth/google">Google</a>
        <a href="/auth/instagram">Instagram</a>
      </div>
    </div>
  );
};

export default Registration;
