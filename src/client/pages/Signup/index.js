import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { parse } from 'cookie';
import { decode } from 'jsonwebtoken';

import api from 'Api';
import Layout from 'Components/Layout';
import Stepper from 'Components/Stepper';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import completedStepsImg from 'Images/hands-half2.jpg';

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
      activeStep: 0,
      error: '',
    };
  }

  componentDidMount() {
    const { accessToken } = this.props.match.params;

    if (accessToken) {
      api(`/auth/signup/verification/${accessToken}`)
        .then((res) => {
          console.log(res);
          this.routeStep();
        })
        .catch(({ response }) => {
          console.log('There was a problem with the accessToken: ', response.data.err);
          this.setState({ error: 'There was a problem with the accessToken' });
          this.routeStep();
        });
    } else {
      this.routeStep();
    }
  }

  logout() {
    const cookieName = 'token';
    if (isDevelopment) {
      document.cookie = cookieName + '=; Max-Age=-1;';
    } else {
      document.cookie = cookieName + '=; Max-Age=-1; Domain=onedeeds.com';
    }
    this.routeStep();
  }

  routeStep() {
    const { token } = parse(document.cookie);
    const user = decode(token);

    console.log(`Routing to step according to user: ${JSON.stringify(user)}`);

    if (!user) {
      this.goToStep(0);
    } else if (!user.isPaid) {
      this.goToStep(1);
    } else if (!user.isVerified) {
      this.goToStep(2);
    } else {
      this.goToStep(3);
    }
  }

  subscribe(email, name) {
    this.setState({ loading: true });

    api
      .post('/auth/signup', { email, name })
      .then((res) => {
        this.setState({ loading: false, error: '' });
        // TODO: Trigger redux signup step
        const user = res.data;
        console.log(user);
        this.routeStep();
      })
      .catch((err) => {
        console.log('Failed to subscribe', err);
        this.setState({ loading: false, error: 'Failed to subscribe' });
        this.logout();
      });
  }

  goToStep(index) {
    this.setState({ activeStep: index });
  }

  render() {
    const facebookClasses = stylesCtx(styles.Login, styles.Facebook);
    const googleClasses = stylesCtx(styles.Login, styles.Google);

    const { activeStep } = this.state;

    const getStepTip = () => {
      if (activeStep === 0) {
        const tip = `You are awasome for choosing the oneDeeds community!`;
        return (
          <span>
            <b>{tip}</b>
            <div>Complete signup in 3 easy steps.</div>
          </span>
        );
      }

      if (activeStep === 1) {
        const tip = `To become a member, we ask for a donation of $1.00 a month.`;

        return (
          <span>
            <b>Thanks for subscribing.</b>
            <div>{tip}</div>
          </span>
        );
      }

      if (activeStep === 2) {
        const tip = `Please verify your email address by clicking on the verification link we sent to your email.`;
        return (
          <span>
            <b>You are almost done!</b>
            <div>{tip}</div>
          </span>
        );
      }

      if (activeStep === 3) {
        const thankYouNote = `You're all set! Check your email to start completing your monthly good deed! Just don't forget to share and tag with #oneDeeds!`;
        return (
          <span>
            <b>Thank you!</b>
            <div>{thankYouNote}</div>
          </span>
        );
      }
    };

    return (
      <div className={styles.Signup}>
        <div className={styles.FixedHeader} />
        <NavToggle page="signup" />
        <Logo />
        <Layout>
          <div className={styles.Container}>
            <button onClick={() => this.logout()}>Logout</button>
            <Stepper
              steps={[
                { title: 'Subscribe', completedTitle: 'Subscribed' },
                { title: 'Donate', completedTitle: 'Donated' },
                { title: 'Verification', completedTitle: 'Verified' },
              ]}
              activeStep={activeStep}
            />
            <div className={styles.StepsTips}>{getStepTip()}</div>
            {this.state.activeStep === 0 && (
              <div>
                <div className={styles.SignupWrap}>
                  <Email subscribe={(email, name) => this.subscribe(email, name)} />
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
                <span className={styles.NotShare}>* We&#39;ll never post anything without your permission.</span>
              </div>
            )}
            {this.state.activeStep === 1 && <div>step 2 content</div>}
            {this.state.activeStep === 2 && <div>step 3 content</div>}
            {this.state.activeStep === 3 && (
              <img src={completedStepsImg} style={{ width: '100%', height: 'auto', maxHeight: '600px' }} />
            )}
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
      step: PropTypes.any,
    }),
  }),
};

export default Signup;
