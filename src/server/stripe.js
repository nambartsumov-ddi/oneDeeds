import Stripe from 'stripe';
import config from './config';
import createDebug from 'debug';

const debug = createDebug('stripe');

const stripeInstance = new Stripe(config.payMethod.stripeSecretKey);

const createSubscription = (customerId, customerEmail) => {
  return stripeInstance.subscriptions
    .create({
      customer: customerId,
      items: [
        {
          plan: config.payMethod.stripePlanId,
        },
      ],
      metadata: {
        email: customerEmail,
      },
    })
    .catch(function(error) {
      debug(error);
      res.status(402).json(error);
    });
};

const cancelSubscription = (subscriptionId) => {
  return stripeInstance.subscriptions.del(subscriptionId).catch(function(error) {
    debug(error);
    res.status(402).json(error);
  });
};

const createCustomer = (tokenId, userId, userEmail, res) => {
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
      debug('Customer created!');
      return createSubscription(customer.id, customer.email);
    })
    .catch(function(error) {
      debug(error.message);
      res.status(402).json(error);
    });
};

const retrieveCustomer = (customerId, res) => {
  return stripeInstance.customers
    .retrieve(customerId)
    .then((customer) => {
      debug('Customer retrieved!');
      return createSubscription(customer.id, customer.email);
    })
    .catch(function(error) {
      debug(error.message);
      res.status(402).json(error);
    });
};

const retrieveCustomerAndCancelSubscription = (customerId, res) => {
  return stripeInstance.customers
    .retrieve(customerId)
    .then((customer) => {
      debug('Customer retrieved!');
      const subscriptionId = customer.subscriptions.data[0].id;
      return cancelSubscription(subscriptionId, customer.email);
    })
    .catch(function(error) {
      debug(error.message);
      res.status(402).json(error);
    });
};

export { createCustomer, retrieveCustomer, retrieveCustomerAndCancelSubscription };
