import express from 'express';
import createDebug from 'debug';
import passport from 'passport';

import User from '../api/resources/user/user.model';
import Token from '../api/resources/token/token.model';

const debug = createDebug('api');
const apiRouter = express.Router();

export const handleApiError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

debug('Inside api route...');

apiRouter.post('/login', (req, res, next) => {
  debug('Inside /login route...');

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    res.json({ user });
  })(req, res, next);
});

apiRouter.get('/login/:accessToken', (req, res, next) => {
  debug('Inside /login/:accessToken route...');

  // Find a matching token
  Token.findOneAndDelete({ accessToken: req.params.accessToken }, function(err, accessToken) {
    if (err) {
      return next(err);
    }

    if (!accessToken) {
      return res.status(404).send({ message: 'We were unable to find a valid token. Your token my have expired.' });
    }

    const updatedUser = {
      isVerified: true,
    };

    // If we found a token, find a matching user and update as a verified email
    User.findByIdAndUpdate(
      accessToken._userId,
      updatedUser,
      { fields: { name: 1, provider: 1, email: 1, isVerified: 1, google: 1, facebook: 1 }, new: true },
      function(err, user) {
        if (!user) {
          return res.send({ message: 'We were unable to find a user for this token.' });
        }

        // Note: passport.authenticate() middleware invokes req.login() automatically.
        // This function is primarily used when users sign up, during which req.login() can be invoked to automatically
        // log in the newly registered user.

        req.login(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.json({ user });
        });
      }
    );
  });
});

apiRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

apiRouter.get('/', (req, res, next) => {
  debug('/ requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default apiRouter;
