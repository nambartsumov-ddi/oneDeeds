import express from 'express';
import createDebug from 'debug';
import { setCookie } from './jwt';
import passport from 'passport';
import passportSetup from './passport';
import config from '../config';
import randomstring from 'randomstring';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';
import sendTransactionalEmail from '../sendgrid';

const debug = createDebug('auth');
const authRouter = express.Router();

debug('/auth route...');
passportSetup(passport);

authRouter.post('/signup', (req, res, next) => {
  const { email, name } = req.body;

  function sendTokenEmail(user) {
    const newToken = new Token({
      _userId: user.id,
      accessToken: randomstring.generate({
        length: 64,
      }),
    });

    newToken.save((err) => {
      if (err) return next(err);
      sendTransactionalEmail(req.headers.origin, newToken.accessToken, email, name)
        .then(() => {
          debug(`Email sent to ${email}! Token: ${newToken.accessToken}`);
          setCookie(user, res);
          res.json(user);
        })
        .catch((err) => next(err));
    });
  }

  User.findOne({ email }).exec((err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      if (!existingUser.isVerified) {
        // Create an access token for existing user
        sendTokenEmail(existingUser);
      } else {
        setCookie(existingUser, res);
        res.json(existingUser);
      }
    } else {
      // Create user and send access token
      const newUser = new User({
        name,
        email,
        provider: 'email',
        isPaid: false,
        isVerified: false,
        isActive: false,
      });

      newUser.save((err) => {
        if (err) return next(err);

        // Create an access token for this user
        sendTokenEmail(newUser);
      });
    }
  });
});

authRouter.get('/signup/verification/:accessToken', (req, res, next) => {
  debug('/auth/signup/verification/:accessToken route...');

  // Find a matching token
  Token.findOneAndDelete({ accessToken: req.params.accessToken }, function(err, accessToken) {
    if (err) {
      return next(err);
    }

    if (!accessToken) {
      return res.status(404).json({ err: 'No token found.' });
    }

    const updatedUser = {
      isVerified: true,
    };

    // If we found a token, find a matching user and update as a verified email
    User.findByIdAndUpdate(accessToken._userId, updatedUser, {
      fields: { name: 1, provider: 1, email: 1, isVerified: 1, isPaid: 1, isActive: 1, google: 1, facebook: 1 },
      new: true,
    }).exec((err, user) => {
      if (err) res.json({ err });

      if (!user) {
        return res.json({ err: 'We were unable to find a user for this token.' });
      }

      setCookie(user, res);
      res.json(user);
    });
  });
});

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  const { user } = req;
  setCookie(user, res);
  res.redirect(`${config.rootClientURL}/signup`);
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const { user } = req;
  setCookie(user, res);
  res.redirect(`${config.rootClientURL}/signup`);
});

authRouter.get('/', (req, res, next) => {
  debug('/auth requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default authRouter;
