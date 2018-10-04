import express from 'express';
import createDebug from 'debug';
import passport from 'passport';
import passportSetup from './passport';
import config from '../config';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';

const debug = createDebug('auth');
const authRouter = express.Router();

export const handleAuthError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

debug('/auth route...');
passportSetup(passport);

authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: `${config.redirectURL}/act-now`,
    failureRedirect: `${config.redirectURL}/act-now`,
  }),
  (req, res, next) => {
    res.json(req.user);
  }
);

authRouter.get('/login/:accessToken', (req, res, next) => {
  debug('/auth/login/:accessToken route...');

  // Find a matching token
  Token.findOneAndDelete({ accessToken: req.params.accessToken }, function(err, accessToken) {
    if (err) {
      return next(err);
    }

    if (!accessToken) {
      return res.status(404).send({ message: 'Your token may have expired.' });
    }

    const updatedUser = {
      isVerified: true,
    };

    // If we found a token, find a matching user and update as a verified email
    User.findByIdAndUpdate(
      accessToken._userId,
      updatedUser,
      { fields: { name: 1, provider: 1, email: 1, isVerified: 1, google: 1, facebook: 1 }, new: true },
      (err, user) => {
        if (err) res.send({ err });

        if (!user) {
          return res.send('We were unable to find a user for this token.');
        }

        // Note: passport.authenticate() middleware invokes req.login() automatically.
        // This function is primarily used when users sign up, during which req.login() can be invoked to automatically
        // log in the newly registered user.

        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      }
    );
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${config.redirectURL}/act-now`);
});

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `${config.redirectURL}/act-now`,
    failureRedirect: `${config.redirectURL}/act-now`,
  })
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${config.redirectURL}/act-now`,
    failureRedirect: `${config.redirectURL}/act-now`,
  })
);

authRouter.get('/', (req, res, next) => {
  debug('/auth requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default authRouter;
