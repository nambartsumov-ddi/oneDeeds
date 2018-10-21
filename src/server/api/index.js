import express from 'express';
import createDebug from 'debug';
import { setCookie } from '../auth/jwt';
import { createCustomer, retrieveCustomer } from '../stripe';
import User from '../api/resources/user/user.model';

const debug = createDebug('api');
const apiRouter = express.Router();

debug('api route...');

// All stripe methods takes a callback as their last parameter. The callback is called with an error code (if any) and then the response.
// TODO: Error handling

// When a subscription changes to canceled or unpaid, your webhook script should ensure the customer is no longer receiving your products or services.
// TODO: Webhooks
apiRouter.post('/charge-stripe', (req, res, next) => {
  const { token, user } = req.body;

  // 1. query the user
  User.findById(user._id).exec((err, existingUser) => {
    if (err) return res.json({ err });

    if (!existingUser) {
      return res.status(404).json({ err: 'We were unable to find a user.' });
    }

    const customerId = {
      value: '',
    };

    try {
      if (!existingUser.customerId) {
        // 2. create customer if not exist
        debug('No customerId found, creating stripe customer for this user');
        createCustomer(token.id, existingUser.id, user.email).then((subscription) => {
          customerId.value = subscription.customer;
          findAndUpdateUser();
          debug('Customer created!');
          debug('Subscription created!');
        });
      } else {
        debug('CustomerId found, retrieve stripe customer and subscribing this user to a plan');
        retrieveCustomer(existingUser.customerId).then((subscription) => {
          customerId.value = subscription.customer;
          debug('Customer retrieved!');
          debug('Subscription created!');
          findAndUpdateUser();
        });
      }
    } catch {
      return next(err);
    }

    function findAndUpdateUser() {
      const updatedUser = {
        customerId: customerId.value,
        isPaid: true,
        isActive: existingUser.isVerified, // This will trigger mailchimp mailing list
      };

      // 4. update as the user as paid and customerId
      User.findByIdAndUpdate(user._id, updatedUser, {
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
          return res.json({ err: 'We were unable to find a user for this token.' });
        }

        // 5. if isActive, insert email to mailchimp list
        // TODO: Update isActive on resend token (step 3) and check if paid and insert user to mailchimp there as well.

        setCookie(user, res);
        res.json(user);
      });
    }
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
