import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, setUser } from 'Actions';
import PropTypes from 'prop-types';
import { parse } from 'cookie';
import { decode } from 'jsonwebtoken';
import { StripeProvider, Elements } from 'react-stripe-elements';
import ReactLoading from 'react-loading';
import YouTube from 'react-youtube';

import api from 'Api';
import Layout from 'Components/Layout';
import Stepper from 'Components/Stepper';
import Email from 'Components/Email';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import StripeCheckout from 'Components/StripeCheckout';
import { trackSubscribedEvent, trackPaidEvent, trackVerifiedEvent } from 'Containers/App/analytics';

import completedStepsImg from 'Images/hands-half2.jpg';
import stripeSecure from 'Assets/Icons/stripe-security.png';

import styles from './Signup.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const isDevelopment = process.env.NODE_ENV === 'development';
// const basePath = isDevelopment ? '/api' : 'https://api.onedeeds.com';

const STRIPE_PK = isDevelopment ? 'pk_test_AdwNPNpOST5l9yBgSlFaxYrN' : 'pk_live_FU83OHIhCKAoRKmCSEvqiiT3';

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
          trackVerifiedEvent();
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
        trackSubscribedEvent();
        this.routeStep();
      })
      .catch((err) => {
        console.log('Failed to subscribe', err);
        this.setState({ loading: false, error: err.response.data });
        this.props.logout();
        this.props.setUser();
      });
  }

  async donate(stripe) {
    this.setState({ loading: true });

    const card = {
      type: 'card',
      name: this.props.user.name,
      address_country: 'US',
    };

    if (stripe) {
      const { token, error } = await stripe.createToken(card);

      if (token) {
        this.setState({
          token: token,
          error: '',
        });

        api
          .post('/charge-stripe', { token, user: this.props.user })
          .then((res) => {
            const user = res.data;
            this.props.setUser(user);
            this.setState({ loading: false, error: '' });
            trackPaidEvent();
            this.routeStep();
            return true;
          })
          .catch((err) => {
            console.log('err', err.response.data.message);
            this.setState({ loading: false, error: err.response.data.message });
            return true;
          });
      }

      if (error) {
        console.log(error.message);
        this.setState({
          loading: false,
          token: null,
          error: error.message,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  async resendVerificationEmail(event) {
    event.preventDefault();

    this.setState({ loading: true });
    const email = this.props.user.email;
    const name = this.props.user.name;

    api
      .post('/auth/signup/resend-verifiaction-email', { email, name })
      .then((res) => {
        const user = res.data;
        this.props.setUser(user);
        this.setState({ loading: false, error: '' });
        this.routeStep();
      })
      .catch((err) => {
        console.log('Failed to resend verification email', err);
        this.setState({ loading: false, error: err.response.data });
      });
  }

  goToStep(index) {
    this.setState({ activeStep: index });
  }

  render() {
    // const facebookClasses = stylesCtx(styles.Login, styles.Facebook);
    // const googleClasses = stylesCtx(styles.Login, styles.Google);

    const resendEmailClasses = stylesCtx(styles.ResendVerificationButton, {
      [styles.DisableButton]: this.state.loading,
    });

    const facebookIconClasses = stylesCtx(styles.Icon, styles.Facebook);
    const twitterIconClasses = stylesCtx(styles.Icon, styles.Twitter);
    const instagramIconClasses = stylesCtx(styles.Icon, styles.Instagram);
    const mediumIconClasses = stylesCtx(styles.Icon, styles.Medium);

    const { activeStep } = this.state;

    const logoutHandler = () => {
      logout();
      setUser();
    };

    const isUserSet = this.props.user ? !!Object.keys(this.props.user).length : false;

    const getStepTip = () => {
      if (activeStep === 0) {
        const tip = `You are awasome for choosing the oneDeeds community!`;
        return (
          <span>
            <b>{tip}</b>
            <div>Complete signup in 3 easy steps. The change is on our hands.</div>
          </span>
        );
      }

      if (activeStep === 1) {
        const tip = `To fund our community and donate to a different charity each month, we ask each of our members for a $1/ month membership fee.`;

        return (
          <span>
            <b>You have completed the first step. Thank you for subscribing.</b>
            <div>{tip}</div>
            <div>
              Your small contribution will make a huge impact, so let&apos;s work together and make a difference!
            </div>
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
                { title: 'Become a Member', completedTitle: "You're a member" },
                { title: 'Verification', completedTitle: 'Verified' },
              ]}
              activeStep={activeStep}
            />
            <div className={styles.StepsTips} style={{ padding: '0 20px' }}>
              {getStepTip()}
            </div>
            {this.state.activeStep === 0 && (
              <div>
                <div className={styles.SignupWrap}>
                  <Email
                    subscribe={(email, name) => this.subscribe(email, name)}
                    isRequestDone={this.state.isRequestDone}
                    isParentLoading={this.state.loading}
                  />
                  {this.state.error && <span className={styles.InvalidText}>&raquo; {this.state.error}</span>}
                  {/* <span className={styles.Or}>or</span>
                  <div className={styles.SocialBtnWrapper}>
                    <a href={`${basePath}/auth/facebook`} className={facebookClasses}>
                      Continue with Facebook
                    </a>
                    <a href={`${basePath}/auth/google`} className={googleClasses}>
                      Continue with Google
                    </a>
                  </div>*/}
                </div>
                {/* <span className={styles.ByContinueWith}>
                  By clicking &quot;Continue with&quot; above, you hereby accept our{' '}
                  <a href="https://www.onedeeds.com/toc03.pdf" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  and
                  <a href="https://www.onedeeds.com/pp03.pdf" target="_blank" rel="noopener noreferrer">
                    {' '}
                    Privacy Policy.
                  </a>
                </span>
                <span className={styles.NotShare}>* We&#39;ll never post anything without your permission.</span>*/}
              </div>
            )}
            {this.state.activeStep === 1 && (
              <div>
                <StripeProvider apiKey={STRIPE_PK}>
                  <Elements>
                    <StripeCheckout
                      donate={(stripe) => this.donate(stripe)}
                      isParentLoading={this.state.loading}
                      cardError={this.state.error}
                    />
                  </Elements>
                </StripeProvider>
                <YouTube
                  className={styles.PromoVideo}
                  videoId="FZw5UP3Nrj8"
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      showinfo: 0,
                      color: 'white',
                      origin: window.location.protocol + '//' + window.location.host,
                    },
                  }}
                />
                <div className={styles.Restart}>
                  {isUserSet && (
                    <a className={styles.RestartLink} onClick={() => logoutHandler()} href={`/`}>
                      Restart Registration
                    </a>
                  )}
                </div>
              </div>
            )}
            {this.state.activeStep === 2 && (
              <div className={styles.ResendEmailContainer}>
                <p>Can&lsquo;t find the email?</p>
                <button
                  className={resendEmailClasses}
                  disabled={this.state.loading}
                  onClick={(e) => this.resendVerificationEmail(e)}>
                  {!this.state.loading && <span>Resend Verification Email</span>}
                  {this.state.loading && (
                    <ReactLoading
                      style={{
                        position: 'absolute',
                        width: '32px',
                        height: '32px',
                        fill: '#fff',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      type={'bubbles'}
                      color="#fff"
                    />
                  )}
                </button>
                <div className={styles.Restart}>
                  {isUserSet && (
                    <a className={styles.RestartLink} onClick={() => logoutHandler()} href={`/`}>
                      Restart Registration
                    </a>
                  )}
                </div>
              </div>
            )}
            {this.state.activeStep === 3 && (
              <div>
                <div className={styles.SocialMediaWrapper}>
                  <span>Don&#39;t forget to follow us on our social pages</span>
                  <div className={styles.SocialIcons}>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/onedeeds">
                      <svg width="32" height="32" viewBox="0 0 172.1 366.6" className={facebookIconClasses}>
                        <path d="M114.1 365.6H38.7V183.3H1v-62.8h37.7V82.7C38.7 31.5 60 1 120.4 1h50.3v62.8h-31.4c-23.5 0-25.1 8.8-25.1 25.2l-.1 31.4h57l-6.7 62.8h-50.3v182.4z" />
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/onedeeds">
                      <svg width="32" height="32" viewBox="0 0 487.7 487.7" className={instagramIconClasses}>
                        <circle cx="243.8" cy="245.3" r="70.8" />
                        <path d="M373.5 0H114.3C51.5 0 0 51.4 0 114.3v259.1c0 62.8 51.4 114.3 114.3 114.3h259.1c62.8 0 114.3-51.4 114.3-114.3V114.3C487.7 51.5 436.3 0 373.5 0zM243.8 354.5c-60.3 0-109.2-48.9-109.2-109.2s48.9-109.2 109.2-109.2S353 185 353 245.3s-48.9 109.2-109.2 109.2zm149.8-228.3c-17 0-30.7-13.7-30.7-30.7s13.7-30.7 30.7-30.7 30.7 13.7 30.7 30.7-13.7 30.7-30.7 30.7z" />
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/OneDeeds">
                      <svg width="32" height="32" viewBox="0 0 200 162.5" className={twitterIconClasses}>
                        <path d="M200 19.2c-7.4 3.3-15.3 5.5-23.6 6.5 8.5-5.1 15-13.1 18-22.7-7.9 4.7-16.7 8.1-26.1 10-7.5-8-18.1-13-30-13-22.7 0-41 18.4-41 41 0 3.2.4 6.3 1.1 9.4-34.1-1.7-64.3-18-84.6-42.9-3.5 6.1-5.6 13.1-5.6 20.6 0 14.2 7.2 26.8 18.3 34.2-6.7-.2-13.1-2.1-18.6-5.1v.5c0 19.9 14.1 36.5 32.9 40.2-3.4.9-7.1 1.4-10.8 1.4-2.6 0-5.2-.3-7.7-.7 5.2 16.3 20.4 28.2 38.3 28.5-14 11-31.7 17.6-51 17.6-3.3 0-6.6-.2-9.8-.6 18.2 11.6 39.7 18.4 62.9 18.4 75.5 0 116.7-62.5 116.7-116.7 0-1.8 0-3.5-.1-5.3 8.2-5.8 15.2-13 20.7-21.3z" />
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@onedeeds">
                      <svg width="32" height="32" viewBox="0 0 28 28" className={mediumIconClasses}>
                        <path d="M9.328 6.578v18.328c0 0.484-0.234 0.938-0.766 0.938-0.187 0-0.359-0.047-0.516-0.125l-7.266-3.641c-0.438-0.219-0.781-0.781-0.781-1.25v-17.813c0-0.391 0.187-0.75 0.609-0.75 0.25 0 0.469 0.125 0.688 0.234l7.984 4c0.016 0.016 0.047 0.063 0.047 0.078zM10.328 8.156l8.344 13.531-8.344-4.156v-9.375zM28 8.437v16.469c0 0.516-0.297 0.875-0.812 0.875-0.266 0-0.516-0.078-0.734-0.203l-6.891-3.437zM27.953 6.563c0 0.063-8.078 13.172-8.703 14.172l-6.094-9.906 5.063-8.234c0.172-0.281 0.484-0.438 0.812-0.438 0.141 0 0.281 0.031 0.406 0.094l8.453 4.219c0.031 0.016 0.063 0.047 0.063 0.094z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <img src={completedStepsImg} style={{ width: '100%', height: 'auto', maxHeight: '600px' }} />
                <div className={styles.Restart}>
                  {isUserSet && (
                    <a className={styles.RestartLink} onClick={() => logoutHandler()} href={`/`}>
                      Restart Registration
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className={styles.SecurityInfo}>
              <div>
                * Remember, at any point you can unsubscribe and easily cancel your membership. See FAQ page for more
                information.
              </div>
              <div>
                OneDeeds is committed to the safety of your payment information. We work with the #1 payment service
                provider in the world: &nbsp;
              </div>
              <a href="https://www.stripe.com" rel="noopener noreferrer" target="_blank">
                <img src={stripeSecure} alt="stripe" />
              </a>
            </div>
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
