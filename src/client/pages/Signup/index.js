import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, setUser } from 'Actions';
import PropTypes from 'prop-types';
import { parse } from 'cookie';
import { decode } from 'jsonwebtoken';
import { StripeProvider, Elements } from 'react-stripe-elements';

import api from 'Api';
import Layout from 'Components/Layout';
import Stepper from 'Components/Stepper';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import StripeCheckout from 'Components/StripeCheckout';
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
      isRequestDone: false,
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

  routeStep() {
    const { token } = parse(document.cookie);
    const user = decode(token);

    this.props.setUser(JSON.parse(JSON.stringify(user)));

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
        const user = res.data;
        this.props.setUser(user);
        this.setState({ loading: false, error: '' });
        this.routeStep();
      })
      .catch((err) => {
        console.log('Failed to subscribe', err);
        this.setState({ loading: false, error: err.response.data });
        this.props.logout();
        this.props.setUser();
      });
  }

  donate(token) {
    this.setState({ loading: true });

    api
      .post('/charge-stripe', { token, user: this.props.user })
      .then((res) => {
        const user = res.data;
        this.props.setUser(user);
        this.setState({ loading: false, error: '' });
        this.routeStep();
        return true;
      })
      .catch((err) => {
        console.log('Failed to donate in /charge-stripe api post request', err);
        this.setState({ loading: false, error: 'Something went wrong. Please try again.' });
        return true;
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
                  <Email
                    subscribe={(email, name) => this.subscribe(email, name)}
                    isRequestDone={this.state.isRequestDone}
                    isParentLoading={this.state.loading}
                  />
                  {this.state.error && <span className={styles.InvalidText}>&raquo; {this.state.error}</span>}
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
            {this.state.activeStep === 1 && (
              <StripeProvider apiKey="pk_test_AdwNPNpOST5l9yBgSlFaxYrN">
                <Elements>
                  <StripeCheckout
                    donate={(email, name) => this.donate(email, name)}
                    isParentLoading={this.state.loading}
                  />
                </Elements>
              </StripeProvider>
            )}
            {this.state.activeStep === 2 && <div>resend token step (3)</div>}
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
  stripe: PropTypes.shape({
    createToken: PropTypes.string,
  }),
  logout: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout, setUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
