import React from 'react';
import classNames from 'classnames';

import Layout from 'Components/Layout';
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
      <Layout>
        <div className={styles.Container}>
          <Steps />
          <div className={styles.SignupWrap}>
            <Email />
            <span className={styles.Or}>or</span>
            <div className={styles.SocialBtnWrapper}>
              <a href="/auth/facebook" className={facebookClasses}>
                Continue with Facebook
              </a>
              <a href="/auth/google" className={googleClasses}>
                Continue with Google
              </a>
            </div>
          </div>
          <span className={styles.Policy}>
            By creating an account, you are agreeing to our <a href="">Terms of Service</a> and
            <a href=""> Privacy Policy</a>.
          </span>

          <span className={styles.NotShare}>* We&#39;ll never post anything without your permission.</span>
        </div>
      </Layout>
    </div>
  );
};

export default Registration;
