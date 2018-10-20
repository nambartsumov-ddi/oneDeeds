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
      isParentLoading: false,
    };
  }

  async handleStripPayment(event) {
    event.preventDefault();

    this.setState({
      isParentLoading: true,
    });

    const card = {
      type: 'card',
      name: this.props.name,
      address_country: 'US',
    };

    if (this.props.stripe) {
      const { token, error } = await this.props.stripe.createToken(card);

      if (token) {
        this.setState({
          token: token,
          error: '',
        });

        this.props.donate(token);
      }

      if (error) {
        console.log(error.message);
        this.setState({
          isParentLoading: false,
          token: null,
          error: error.message,
        });
      }
    } else {
      this.setState({
        isParentLoading: false,
      });
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {
    const stripeCheckoutClasses = stylesCtx(styles.StripCheckout);
    const payButtonClasses = stylesCtx(styles.PayButton);

    return (
      <form onSubmit={(e) => this.handleStripPayment(e)}>
        <div className={stripeCheckoutClasses}>
          <CardElement classes={{ base: styles.StripeElement }} />
          <div>
            <button className={payButtonClasses} type="submit" style={{ position: 'relative' }}>
              {!this.state.isParentLoading && <span>Donate</span>}
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
  name: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    name: state.userState.user.name,
  };
};

export default connect(mapStateToProps)(injectStripe(StripeCheckout));
