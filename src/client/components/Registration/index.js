import React from 'react';
import classNames from 'classnames';

import Steps from 'Components/Steps';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

import styles from './Registration.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Registration = () => {
  const facebookClasses = stylesCtx(styles.Login, styles.Facebook);
  const googleClasses = stylesCtx(styles.Login, styles.Google);

  return (
    <div className={styles.Registration}>
      <NavToggle page="registration" />
      <Logo />
      <Steps />
      <Email />
      <span className={styles.Or}>OR</span>
      <div className={styles.SocialBtnWrapper}>
        <a href="/auth/facebook" className={facebookClasses}>
          Login with Facebook
        </a>
        <a href="/auth/google" className={googleClasses}>
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Registration;
