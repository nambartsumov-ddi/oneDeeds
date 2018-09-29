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

apiRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    res.json({ user, message: info.message });
  })(req, res, next);
});

apiRouter.get('login/:accessToken', (req, res, next) => {
  // Find a matching token
  Token.findOne({ accessToken: req.params.accessToken }, function(err, accessToken) {
    if (err) {
      return next(err);
    }

    if (!accessToken) {
      return res.send({ message: 'We were unable to find a valid token. Your token my have expired.' });
    }

    const updatedUser = {
      local: {
        isVerified: true,
      },
    };

    // If we found a token, find a matching user
    User.findByIdAndUpdate(accessToken._userId, updatedUser, { new: true }, function(err, user) {
      if (!user) {
        return res.send({ message: 'We were unable to find a user for this token.' });
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({ user, message: 'The access token has been verified. You are logged in.' });
      });
    });
  });
});

apiRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to oneDeeds API.',
    version: 'v1',
  });
});

export default apiRouter;
