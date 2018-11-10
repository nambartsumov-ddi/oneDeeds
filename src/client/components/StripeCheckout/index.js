import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import styles from './StripeCheckout.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

class StripeCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      error: null,
      isParentLoading: this.props.isParentLoading,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isParentLoading !== state.isParentLoading) {
      return {
        isParentLoading: props.isParentLoading,
        cardError: props.cardError,
      };
    }
    return null;
  }

  async handleStripPayment(event) {
    event.preventDefault();
    this.props.donate(this.props.stripe);
  }

  render() {
    const isDonateDisabled = () => {
      return this.state.isParentLoading;
    };

    const stripeCheckoutClasses = stylesCtx(styles.StripCheckout);
    const payButtonClasses = stylesCtx(styles.PayButton, {
      [styles.DisableButton]: isDonateDisabled(),
    });

    return (
      <form onSubmit={(e) => this.handleStripPayment(e)}>
        <div className={stripeCheckoutClasses}>
          <CardElement classes={{ base: styles.StripeElement }} />
          <div>
            <button
              disabled={isDonateDisabled()}
              className={payButtonClasses}
              type="submit"
              style={{ position: 'relative' }}>
              {!this.state.isParentLoading && <span>Become a Member</span>}
              {this.state.isParentLoading && (
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
            <div className={styles.ErrorMessage}>{this.state.error}</div>
            <div className={styles.ErrorMessage}>{this.state.cardError}</div>
          </div>
        </div>
      </form>
    );
  }
}

StripeCheckout.propTypes = {
  stripe: PropTypes.object,
  donate: PropTypes.func,
  isParentLoading: PropTypes.bool,
  cardError: PropTypes.string,
};

export default connect()(injectStripe(StripeCheckout));
