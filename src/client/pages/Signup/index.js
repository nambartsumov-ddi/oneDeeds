import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Stepper';
import Stepper from '@material-ui/core/Stepper';
// import StepIcon from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
// import StepConnector from '@material-ui/core/StepConnector';

import api from 'Api';
import Layout from 'Components/Layout';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

import styles from './Signup.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const isDevelopment = process.env.NODE_ENV === 'development';
const basePath = isDevelopment ? '/api' : 'https://api.onedeeds.com';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeStep: 1,
      skipped: new Set(),
    };
  }

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

    const { activeStep } = this.state;

    return (
      <div className={styles.Signup}>
        <div className={styles.FixedHeader} />
        <NavToggle page="signup" />
        <Logo />
        <Layout>
          <div className={styles.Container}>
            <Stepper activeStep={activeStep} alternativeLabel={true} orientation="horizontal">
              <Step>
                <StepLabel>1</StepLabel>
              </Step>
              <Step>
                <StepLabel>2</StepLabel>
              </Step>
              <Step>
                <StepLabel>3</StepLabel>
              </Step>
            </Stepper>

            <div className={styles.SignupWrap}>
              <Email />
              <span className={styles.Or}>or</span>
              <div className={styles.SocialBtnWrapper}>
                <a href={`${basePath}/auth/facebook`} className={facebookClasses}>
                  Continue with Facebook
                </a>
                <a href={`${basePath}/auth/google`} className={googleClasses}>
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

Signup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accessToken: PropTypes.any,
    }),
  }),
};

export default Signup;
