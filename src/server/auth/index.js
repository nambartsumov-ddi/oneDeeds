import express from 'express';
import createDebug from 'debug';
import passport from 'passport';
import passportSetup from './passport';
import config from '../config';
import randomstring from 'randomstring';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';
import sendTokenEmail from '../sendgrid';

const debug = createDebug('auth');
const authRouter = express.Router();

export const handleAuthError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

debug('/auth route...');
passportSetup(passport);

authRouter.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      // Create a access token for existing user
      const newToken = new Token({
        _userId: existingUser.id,
        accessToken: randomstring.generate({
          length: 64,
        }),
      });

      newToken.save((err) => {
        if (err) return done(err);
        sendTokenEmail(req.headers.origin, newToken.accessToken, email)
          .then(() => {
            debug(`Email sent to ${email}! Token: ${newToken.accessToken}`);
          })
          .catch((err) => next(err));
      });
    } else {
      // Create user and send access token
      const newUser = new User({
        provider: 'email',
        email: email,
        isVerified: false,
      });

      newUser.save((err) => {
        if (err) return done(err);

        // Create a access token for this user
        const newToken = new Token({
          _userId: newUser.id,
          accessToken: randomstring.generate({
            length: 64,
          }),
        });

        newToken.save((err) => {
          if (err) return done(err);
          sendTokenEmail(req.headers.origin, newToken.accessToken, email)
            .then(() => {
              debug(`Email sent to ${email}! Token: ${newToken.accessToken}`);
            })
            .catch((err) => next(err));
        });
      });
    }
  });
});

authRouter.get('/signup/:accessToken', (req, res, next) => {
  debug('/auth/signup/:accessToken route...');

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

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `${config.rootClientURL}/signup/payment/`,
    failureRedirect: `${config.rootClientURL}/signup/payment/`,
    session: false,
  })
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${config.rootClientURL}/signup/payment/`,
    failureRedirect: `${config.rootClientURL}/signup/payment/`,
    session: false,
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
