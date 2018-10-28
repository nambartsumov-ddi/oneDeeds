import express from 'express';
import createDebug from 'debug';
import { setCookie } from '../auth/jwt';
import Stripe from 'stripe';
import config from '../config';
import { createCustomer, retrieveCustomer } from '../stripe';
import User from '../api/resources/user/user.model';
import { subscribeUserToList } from '../mailchimp';
import { customerDeletedHook, subscriptionDeletedHook, chargeSuccessHook, chargeFailedHook } from './hooks';

const debug = createDebug('api');
const apiRouter = express.Router();

const stripeInstance = new Stripe(config.payMethod.stripeSecretKey);

debug('api route...');

const findAndUpdateUser = (res, userId, customerId, isVerified) => {
  const updatedUser = {
    customerId: customerId,
    isPaid: true,
    isActive: isVerified,
  };

  // 4. update as the user as paid and customerId
  User.findByIdAndUpdate(userId, updatedUser, {
    fields: {
      name: 1,
      provider: 1,
      email: 1,
      isVerified: 1,
      isPaid: 1,
      customerId: 1,
      isActive: 1,
      google: 1,
      facebook: 1,
    },
    new: true,
  }).exec((err, user) => {
    if (err) return res.json({ err });

    if (!user) {
      return res.json({ err: 'We were unable to find a user.' });
    }

    // 5. if isActive, insert email to mailchimp list
    if (user.isActive) {
      subscribeUserToList(user);
    }

    setCookie(user, res);
    res.json(user);
  });
};

// All stripe methods takes a callback as their last parameter. The callback is called with an error code (if any) and then the response.
// When a subscription changes to canceled or unpaid, webhook script should ensure the customer is no longer paid or active.
apiRouter.post('/charge-stripe', (req, res, next) => {
  const { token, user } = req.body;

  // 1. query the user
  User.findById(user._id).exec((err, existingUser) => {
    if (err) return next(err);

    if (!existingUser) {
      return res.status(404).json({ err: 'We were unable to find a user.' });
    }

    const customerId = {
      value: '',
    };

    if (!existingUser.customerId) {
      // 2. create customer if not exist and subscribe to a plan
      debug('No customerId found, creating stripe customer for this user');
      createCustomer(token.id, existingUser.id, user.email, res)
        .then((subscription) => {
          if (!subscription) {
            return;
          }
          customerId.value = subscription.customer;
          findAndUpdateUser(res, existingUser.id, customerId.value, existingUser.isVerified);
          debug('Subscription created!');
        })
        .catch(function(error) {
          debug(error.message);
          res.status(500).send({ error });
        });
    } else {
      // 3. Retrieve a customer and subscribe to a plan
      debug('CustomerId found, retrieve stripe customer and subscribing this user to a plan');
      retrieveCustomer(existingUser.customerId, res)
        .then((subscription) => {
          if (!subscription) {
            return;
          }
          customerId.value = subscription.customer;
          debug('Subscription created!');
          findAndUpdateUser(res, existingUser.id, customerId.value, existingUser.isVerified);
        })
        .catch(function(error) {
          debug(error.message);
          res.status(500).send({ error });
        });
    }
  });
});

apiRouter.post('/webhooks/stripe/charge-failed/', (req, res, next) => {
  // charge.failed
  stripeInstance.events.retrieve(req.body.type, function(err, event) {
    if (err) return next(err);

    const type = event.type;
    debug(type);

    // Check if charge failed for some reason
    if (type !== 'charge.failed') {
      return res.status(200).json('No hook found');
    }

    const customerId = event.data.object.customer;

    stripeInstance.customers.retrieve(customerId, function(err, customer) {
      if (err) return next(err);
      chargeFailedHook(res, customer);
    });
  });
});

apiRouter.post('/webhooks/stripe/charge-succeeded/', (req, res, next) => {
  // charge.succeeded
  stripeInstance.events.retrieve(req.body.id, function(err, event) {
    if (err) return next(err);

    const type = event.type;
    debug(type);

    // Check if charge succeeded
    if (type !== 'charge.succeeded') {
      return res.status(200).json('No hook found');
    }

    const customerId = event.data.object.customer;

    stripeInstance.customers.retrieve(customerId, function(err, customer) {
      if (err) return next(err);
      chargeSuccessHook(res, customer);
    });
  });
});

apiRouter.post('/webhooks/stripe/subscription-deleted/', (req, res, next) => {
  stripeInstance.events.retrieve(req.body.id, function(err, event) {
    if (err) return next(err);

    const type = event.type;
    debug(type);

    // Check that the event type is a subscription cancellation.
    if (type !== 'customer.subscription.deleted') {
      return res.status(200).json('No hook found');
    }

    const customerId = event.data.object.customer;

    stripeInstance.customers.retrieve(customerId, function(err, customer) {
      if (err) return next(err);

      // Customer deleted
      if (customer.deleted) {
        customerDeletedHook(res, customer);
      }

      // only subscription deleted
      else {
        subscriptionDeletedHook(res, customer);
      }
    });
  });
});

apiRouter.get('/', (req, res, next) => {
  debug('/ requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default apiRouter;
