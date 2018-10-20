import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactLoading from 'react-loading';

import styles from './Email.module.scss';

// TODO: Change component to a form with form submit.
// TODO: Dispatch redux action onSubmit
class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isTermsRead: false,
      emailCompare: '',
      isCompareSuccess: undefined,
      isValidEmail: undefined,
      isValidCompareEmail: undefined,
      isParentLoading: false,
    };
  }

  componentDidUpdate(nextProps) {
    if (this.state.isParentLoading !== nextProps.isParentLoading) {
      this.setState({ isParentLoading: nextProps.isParentLoading });
    }
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onCompareEmailChange(event) {
    const emailCompareValue = event.target.value;
    const isValidCompareEmail = emailCompareValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (!emailCompareValue) {
      this.setState({
        emailCompare: '',
        isCompareSuccess: undefined,
        isValidCompareEmail: undefined,
      });
      return;
    }

    if (this.state.email.toLowerCase() === event.target.value.toLowerCase()) {
      this.setState({
        emailCompare: emailCompareValue,
        isCompareSuccess: true,
        isValidCompareEmail: !!isValidCompareEmail,
      });
    } else {
      this.setState({
        emailCompare: emailCompareValue,
        isCompareSuccess: false,
        isValidCompareEmail: !!isValidCompareEmail,
      });
    }
  }

  onEmailChange(event) {
    const emailValue = event.target.value;
    const isValidEmail = emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (!emailValue) {
      this.setState({
        email: '',
        isValidEmail: undefined,
        isCompareSuccess: undefined,
        isValidCompareEmail: undefined,
      });
      return;
    }

    if (this.state.emailCompare.toLowerCase() === event.target.value.toLowerCase()) {
      this.setState({ email: emailValue, isCompareSuccess: true, isValidEmail: !!isValidEmail });
    } else {
      this.setState({ email: emailValue, isCompareSuccess: false, isValidEmail: !!isValidEmail });
    }
  }

  onCheckboxChange(event) {
    this.setState({ isTermsRead: event.target.checked });
  }

  subscribeHandler() {
    this.setState({ isParentLoading: true });
    this.props.subscribe(this.state.email, this.state.name);
  }

  render() {
    // Because we use css-modules we need to bind styles to classNames utilities
    const stylesCtx = classNames.bind(styles);

    const isSubscribeDisabled = () => {
      return (
        !(this.state.isValidEmail && this.state.isCompareSuccess && this.state.isTermsRead) ||
        this.state.isParentLoading
      );
    };

    const subscribeClasses = stylesCtx(styles.Subscribe, {
      [styles.DisableButton]: isSubscribeDisabled(),
      [styles.LoadingButton]: this.state.isParentLoading,
    });

    const emailInputClasses = stylesCtx(styles.EmailInput, {
      [styles.InvalidEmail]: this.state.isValidEmail !== undefined && this.state.isValidEmail === false,
    });

    const emailCompareInputClasses = stylesCtx(styles.EmailInput, {
      [styles.InvalidEmail]: this.state.isValidCompareEmail !== undefined && this.state.isValidCompareEmail === false,
    });

    const emailInputWrapperClasses = stylesCtx(styles.EmailInputWrapper);

    const nameInputWrapperClasses = stylesCtx(styles.NameInputWrapper);

    const nameInputClasses = stylesCtx(styles.NameInput);

    const checkboxInputWrapperClasses = stylesCtx(styles.CheckboxInputWrapper);

    const checkboxInputClasses = stylesCtx(styles.CheckboxInput);

    const preventDefault = (e) => {
      e.preventDefault();
    };

    return (
      <div className={styles.Email}>
        <div className={nameInputWrapperClasses}>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={this.state.name}
            onChange={(e) => this.onNameChange(e)}
            className={nameInputClasses}
            placeholder="Name (optional)"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z" />
          </svg>
        </div>
        <div className={emailInputWrapperClasses}>
          <input
            type="email"
            name="email"
            onCopy={preventDefault}
            onDrag={preventDefault}
            onDrop={preventDefault}
            onPaste={preventDefault}
            autoComplete="off"
            value={this.state.email}
            className={emailInputClasses}
            onChange={(e) => this.onEmailChange(e)}
            placeholder="Email address"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z" />
          </svg>
        </div>
        <div className={emailInputWrapperClasses}>
          <input
            type="email"
            name="email"
            onCopy={preventDefault}
            onDrag={preventDefault}
            onDrop={preventDefault}
            onPaste={preventDefault}
            autoComplete="off"
            value={this.state.emailCompare}
            className={emailCompareInputClasses}
            onChange={(e) => this.onCompareEmailChange(e)}
            placeholder="Verify email address"
          />
          <svg width="32" height="32" viewBox="0 0 32 32" className={styles.Icon}>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z" />
          </svg>
        </div>

        <div className={checkboxInputWrapperClasses}>
          <label htmlFor="isTermsReadCB" className={styles.Label}>
            <input
              type="checkbox"
              name="isTermsRead"
              id="isTermsReadCB"
              checked={this.state.isReadTerms}
              onChange={(e) => this.onCheckboxChange(e)}
              className={checkboxInputClasses}
              placeholder="Verify email address"
            />

            <span className={styles.TermsText}>
              I have read our <a href="">Terms of Service</a> and <a href=""> Privacy Policy</a>
            </span>
          </label>
        </div>

        <button
          type="button"
          disabled={isSubscribeDisabled()}
          className={subscribeClasses}
          onClick={() => this.subscribeHandler()}>
          {!this.state.isParentLoading && <span>Subscribe</span>}
          {this.state.isParentLoading && (
            <ReactLoading
              style={{
                position: 'absolute',
                width: '64px',
                height: '64px',
                fill: '#fff',
              }}
              type={'bubbles'}
              color="#fff"
            />
          )}
        </button>

        {this.state.isValidEmail !== undefined &&
          this.state.isValidEmail === false && (
            <div className={styles.InvalidText}>&raquo; Email address is not valid</div>
          )}

        {this.state.isCompareSuccess !== undefined &&
          !this.state.isCompareSuccess && <div className={styles.InvalidText}>&raquo; Email addresses must match</div>}
      </div>
    );
  }
}

Email.propTypes = {
  subscribe: PropTypes.func,
  isRequestDone: PropTypes.bool,
  isParentLoading: PropTypes.bool,
};

export default Email;
