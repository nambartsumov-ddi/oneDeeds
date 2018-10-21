import Stripe from 'stripe';
import config from './config';

const stripeInstance = new Stripe(config.payMethod.stripeSecretKey);

const createSubscription = (customerId, customerEmail) => {
  return stripeInstance.subscriptions.create({
    customer: customerId,
    items: [
      {
        plan: config.payMethod.stripePlanId,
      },
    ],
    metadata: {
      email: customerEmail,
    },
  });
};

const createCustomer = (tokenId, userId, userEmail) => {
  return stripeInstance.customers
    .create({
      description: 'Stripe customer at oneDeeds.com',
      email: userEmail,
      source: tokenId,
      metadata: {
        userId: userId,
      },
    })
    .then((customer) => {
      return createSubscription(customer.id, customer.email);
    });
};

const retrieveCustomer = (customerId) => {
  return stripeInstance.customers.retrieve(customerId).then((customer) => {
    return createSubscription(customer.id, customer.email);
  });
};

export { createCustomer, retrieveCustomer };
