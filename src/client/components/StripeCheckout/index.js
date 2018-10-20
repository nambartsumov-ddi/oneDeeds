import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';

import styles from './StripeCheckout.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

class StripeCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: null,
      error: null,
      loading: false,
    };
  }

  async handleStripPayment(event) {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const card = {
      type: 'card',
      name: this.props.name,
      address_country: 'US',
    };

    if (this.props.stripe) {
      const { token, error } = await this.props.stripe.createToken(card);
      // TODO: Charge card Stripe API request
      console.log(token, error && error.message);

      this.setState({
        loading: false,
        tokenId: token.id,
        error: error && error.message,
      });

      this.props.donate(this.state.tokenId);
    } else {
      this.setState({
        loading: false,
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
            <button className={payButtonClasses} type="submit">
              {this.state.loading ? 'Processing payment...' : 'Donate'}
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
  name: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    name: state.userState.user.name,
  };
};

export default connect(mapStateToProps)(injectStripe(StripeCheckout));
