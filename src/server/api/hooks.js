import createDebug from 'debug';

import { subscribeUserToList, unSubscribeUserFromList } from '../mailchimp';
import User from '../api/resources/user/user.model';

const debug = createDebug('hooks');

const customerDeletedHook = (res, customer) => {
  User.findOne({ customerId: customer.id }).exec((err, existingUser) => {
    if (err) return res.status(200).json({ err });

    if (!existingUser) {
      return res.status(200).json({ err: 'We were unable to find a user.' });
    }

    const updatedUser = {
      customerId: '',
      isPaid: false,
      isActive: false,
    };

    User.findByIdAndUpdate(existingUser._id, updatedUser, {
      fields: {
        name: 1,
        email: 1,
        isPaid: 1,
        customerId: 1,
        isActive: 1,
      },
      new: true,
    }).exec((err, user) => {
      if (err) return res.status(200).json({ err });

      if (!user) {
        return res.status(200).json({ err: 'We were unable to find a user.' });
      }

      debug('customer deleted hook, isActive: ', user.isActive);

      // mark user as unsubscribed from mailchimp list
      unSubscribeUserFromList(user);

      return res.status(200).send();
    });
  });
};

const subscriptionDeletedHook = (res, customer) => {
  User.findOne({ email: customer.email }).exec((err, existingUser) => {
    if (err) return res.status(200).json({ err });

    if (!existingUser) {
      return res.status(200).json({ err: 'We were unable to find a user.' });
    }

    const updatedUser = {
      customerId: customer.id,
      isPaid: false,
      isActive: false,
    };

    User.findByIdAndUpdate(existingUser._id, updatedUser, {
      fields: {
        naem: 1,
        email: 1,
        isPaid: 1,
        customerId: 1,
        isActive: 1,
      },
      new: true,
    }).exec((err, user) => {
      if (err) return res.status(200).json({ err });

      if (!user) {
        return res.status(200).json({ err: 'We were unable to find a user.' });
      }

      debug('subsctiption deleted hook, isActive: ', user.isActive);

      // mark user as unsubscribed from mailchimp list
      unSubscribeUserFromList(user);

      return res.status(200).send();
    });
  });
};

const chargeSuccessHook = (res, customer) => {
  User.findOne({ customerId: customer.id }).exec((err, existingUser) => {
    if (err) return res.status(200).json({ err });

    if (!existingUser) {
      return res.status(200).json({ err: 'We were unable to find a user.' });
    }

    const updatedUser = {
      customerId: customer.id,
      isPaid: true,
      isActive: existingUser.isVerified,
    };

    User.findByIdAndUpdate(existingUser._id, updatedUser, {
      fields: {
        name: 1,
        email: 1,
        isPaid: 1,
        customerId: 1,
        isActive: 1,
      },
      new: true,
    }).exec((err, user) => {
      if (err) return res.status(200).json({ err });

      if (!user) {
        return res.status(200).json({ err: 'We were unable to find a user.' });
      }

      debug('charge success hook, isActive: ', user.isActive);

      if (user.isActive) {
        // mark user as subscribed to mailchimp list
        subscribeUserToList(user);
      }

      return res.status(200).send();
    });
  });
};

const chargeFailedHook = (res, customer) => {
  User.findOne({ customerId: customer.id }).exec((err, existingUser) => {
    if (err) return res.status(200).json({ err });

    if (!existingUser) {
      return res.status(200).json({ err: 'We were unable to find a user.' });
    }

    const updatedUser = {
      customerId: customer.id,
      isPaid: false,
      isActive: false,
    };

    User.findByIdAndUpdate(existingUser._id, updatedUser, {
      fields: {
        email: 1,
        isPaid: 1,
        customerId: 1,
        isActive: 1,
      },
      new: true,
    }).exec((err, user) => {
      if (err) return res.status(200).json({ err });

      if (!user) {
        return res.status(200).json({ err: 'We were unable to find a user.' });
      }

      debug('charge failed hook, isActive: ', user.isActive);

      // mark user as unsubscribed from mailchimp list
      unSubscribeUserToList(user);

      return res.status(200).send();
    });
  });
};

export { customerDeletedHook, subscriptionDeletedHook, chargeSuccessHook, chargeFailedHook };
