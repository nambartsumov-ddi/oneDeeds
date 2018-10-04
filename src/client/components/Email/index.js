import React, { Component } from 'react';
import classNames from 'classnames';

import api from 'Api';
import styles from './Email.module.scss';

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      isValidEmail: undefined,
      success: undefined,
    };
  }

  onInputChange(event) {
    const emailValue = event.target.value;
    const isValidEmail = emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    this.setState({ email: emailValue, isValidEmail: !!isValidEmail, success: undefined });
  }

  handleEnterPress(event) {
    if (event.key === 'Enter' && !this.state.loading) {
      this.state.isValidEmail && this.signInHandler();
    }
  }

  signInHandler() {
    this.setState({ loading: true });

    const email = {
      email: this.state.email,
    };

    api
      .post('/auth/login', email)
      .then((res) => {
        // TODO: Trigger redux user log in action
        this.setState({ email: '', loading: false, success: true });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ loading: false, success: false });
        console.log('error', err);
      });
  }

  render() {
    // Because we use css-modules we need to bind styles to classNames utilities
    const stylesCtx = classNames.bind(styles);

    const subscribeClasses = stylesCtx(styles.Subscribe, {
      [styles.DisableButton]: !this.state.isValidEmail || this.state.loading,
      [styles.LoadingButton]: this.state.loading,
      [styles.SuccessButton]: this.state.success,
    });

    const emailInputClasses = stylesCtx(styles.EmailInput, {
      [styles.InvalidEmail]: this.state.isValidEmail !== null && this.state.isValidEmail === false,
    });

    const emailInputWrapperClasses = stylesCtx(styles.EmailInputWrapper, {
      [styles.SuccessInputWrapper]: this.state.success,
    });

    return (
      <div className={styles.Email}>
        <div className={emailInputWrapperClasses}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            className={emailInputClasses}
            onChange={(e) => this.onInputChange(e)}
            onKeyPress={(e) => this.handleEnterPress(e)}
            autoComplete="on"
            placeholder="Email address"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z" />
          </svg>
        </div>
        <button
          type="button"
          disabled={!this.state.isValidEmail || this.state.loading}
          className={subscribeClasses}
          onClick={() => this.signInHandler()}>
          {!this.state.loading && <span>Get Access</span>}
          {this.state.loading && <span>Loading...</span>}
        </button>
        {this.state.success && (
          <div>
            <div className={styles.SuccesWrap}>
              Success!
              <svg
                style={{ enableBackground: 'new 0 0 512 512', width: '64px', height: '64px', marginTop: '25px' }}
                viewBox="0 0 512 512">
                <path
                  style={{ fill: '#2bb673' }}
                  d="M489,255.9c0-0.2,0-0.5,0-0.7c0-1.6,0-3.2-0.1-4.7c0-0.9-0.1-1.8-0.1-2.8c0-0.9-0.1-1.8-0.1-2.7  c-0.1-1.1-0.1-2.2-0.2-3.3c0-0.7-0.1-1.4-0.1-2.1c-0.1-1.2-0.2-2.4-0.3-3.6c0-0.5-0.1-1.1-0.1-1.6c-0.1-1.3-0.3-2.6-0.4-4  c0-0.3-0.1-0.7-0.1-1C474.3,113.2,375.7,22.9,256,22.9S37.7,113.2,24.5,229.5c0,0.3-0.1,0.7-0.1,1c-0.1,1.3-0.3,2.6-0.4,4  c-0.1,0.5-0.1,1.1-0.1,1.6c-0.1,1.2-0.2,2.4-0.3,3.6c0,0.7-0.1,1.4-0.1,2.1c-0.1,1.1-0.1,2.2-0.2,3.3c0,0.9-0.1,1.8-0.1,2.7  c0,0.9-0.1,1.8-0.1,2.8c0,1.6-0.1,3.2-0.1,4.7c0,0.2,0,0.5,0,0.7c0,0,0,0,0,0.1s0,0,0,0.1c0,0.2,0,0.5,0,0.7c0,1.6,0,3.2,0.1,4.7  c0,0.9,0.1,1.8,0.1,2.8c0,0.9,0.1,1.8,0.1,2.7c0.1,1.1,0.1,2.2,0.2,3.3c0,0.7,0.1,1.4,0.1,2.1c0.1,1.2,0.2,2.4,0.3,3.6  c0,0.5,0.1,1.1,0.1,1.6c0.1,1.3,0.3,2.6,0.4,4c0,0.3,0.1,0.7,0.1,1C37.7,398.8,136.3,489.1,256,489.1s218.3-90.3,231.5-206.5  c0-0.3,0.1-0.7,0.1-1c0.1-1.3,0.3-2.6,0.4-4c0.1-0.5,0.1-1.1,0.1-1.6c0.1-1.2,0.2-2.4,0.3-3.6c0-0.7,0.1-1.4,0.1-2.1  c0.1-1.1,0.1-2.2,0.2-3.3c0-0.9,0.1-1.8,0.1-2.7c0-0.9,0.1-1.8,0.1-2.8c0-1.6,0.1-3.2,0.1-4.7c0-0.2,0-0.5,0-0.7  C489,256,489,256,489,255.9C489,256,489,256,489,255.9z"
                  id="XMLID_3_"
                />
                <g id="XMLID_1_">
                  <line
                    style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 30, strokeMiterlimit: 10 }}
                    id="XMLID_2_"
                    x1="213.6"
                    x2="369.7"
                    y1="344.2"
                    y2="188.2"
                  />
                  <line
                    style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 30, strokeMiterlimit: 10 }}
                    id="XMLID_4_"
                    x1="233.8"
                    x2="154.7"
                    y1="345.2"
                    y2="266.1"
                  />
                </g>
              </svg>
              <div className={styles.SuccesText}>
                Access link deliverd.
                <br /> Please check your email and click the access link to log in.
              </div>
            </div>
          </div>
        )}
        {this.state.isValidEmail !== null &&
          this.state.isValidEmail === false && <div className={styles.InvalidText}>Email address is not valid.</div>}

        {this.state.success === false && (
          <div className={styles.ErrorWrap}>
            Error!
            <br /> Something went wrong. Please try again.
          </div>
        )}
      </div>
    );
  }
}

export default Email;
