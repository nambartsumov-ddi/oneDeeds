import React, { Component } from 'react';
import styles from './Email.module.scss';
import api from 'Api';
class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onInputChange(event) {
    this.setState({ email: event.target.value });
  }

  signInHandler() {
    const email = {
      email: this.state.email,
    };

    api
      .post('/email-access', email)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  render() {
    return (
      <div className={styles.Email}>
        <div className={styles.EmailInputWrapper}>
          <input
            type="email"
            className={styles.EmailInput}
            onChange={(e) => this.onInputChange(e)}
            autoComplete="on"
            placeholder="Email address"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z" />
          </svg>
        </div>
        <button type="button" className={styles.Subscribe} onClick={() => this.signInHandler()}>
          Subscribe
        </button>
      </div>
    );
  }
}

export default Email;
