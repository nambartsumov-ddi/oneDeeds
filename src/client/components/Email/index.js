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
    };
  }

  onInputChange(event) {
    const emailValue = event.target.value;
    const isValidEmail = emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    this.setState({ email: emailValue, isValidEmail: !!isValidEmail });
  }

  signInHandler() {
    this.setState({ loading: true });

    const email = {
      email: this.state.email,
    };

    api
      .post('/login', email)
      .then((res) => {
        this.setState({ email: '', loading: false });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ email: '', loading: false });
        console.log('error', err);
      });
  }

  render() {
    // Because we use css-modules we need to bind styles to classNames utilities
    const stylesCtx = classNames.bind(styles);

    const subscribeClasses = stylesCtx(styles.Subscribe, {
      [styles.DisableButton]: !this.state.isValidEmail,
    });

    const emailInputClasses = stylesCtx(styles.EmailInput, {
      [styles.InvalidEmail]: this.state.isValidEmail !== null && this.state.isValidEmail === false,
    });

    return (
      <div className={styles.Email}>
        <div className={styles.EmailInputWrapper}>
          <input
            type="email"
            value={this.state.email}
            className={emailInputClasses}
            onChange={(e) => this.onInputChange(e)}
            autoComplete="on"
            placeholder="Email address"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z" />
          </svg>
        </div>
        {/* TODO: Loading... */}
        {this.state.loading && <div>loading...</div>}
        <button
          type="button"
          disabled={!this.state.isValidEmail}
          className={subscribeClasses}
          onClick={() => this.signInHandler()}>
          Get Access
        </button>
        {this.state.isValidEmail !== null &&
          this.state.isValidEmail === false && <div className={styles.InvalidText}>Email address is not valid.</div>}
      </div>
    );
  }
}

export default Email;
