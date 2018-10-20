import Stripe from 'stripe';
import config from './config';

const stripeInstance = new Stripe(config.payMethod.stripeSecretKey);

function createCustomer({ token, user }) {
  return stripeInstance.customers
    .create({
      description: 'Stripe customer at oneDeeds.com',
      email: user.email,
      source: token.id,
      metadata: {
        userId: user.id,
      },
    })
    .then((customer) => {
      return stripeInstance.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: config.payMethod.stripePlanId,
          },
        ],
        metadata: {
          email: customer.email,
        },
      });
    });
}

function getListOfInvoices({ customerId }) {
  debug('getting list of invoices for customer', customerId);
  return stripeInstance.invoices.list({ customer: customerId });
}

export { createCustomer, getListOfInvoices };
