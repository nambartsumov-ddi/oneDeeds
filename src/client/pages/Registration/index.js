import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import api from 'Api';

import Layout from 'Components/Layout';
import Steps from 'Components/Steps';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

import styles from './Registration.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

class Registration extends Component {
  componentDidMount() {
    const accessToken = this.props.match.params.accessToken;

    if (accessToken) {
      api(`/auth/login/${accessToken}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log('There was a problem with the accessToken', err);
        });
    }
  }

  render() {
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
                <a href="/api/auth/facebook" className={facebookClasses}>
                  Continue with Facebook
                </a>
                <a href="/api/auth/google" className={googleClasses}>
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
  }
}

Registration.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accessToken: PropTypes.any,
    }),
  }),
};

export default Registration;
