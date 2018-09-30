import express from 'express';
import createDebug from 'debug';
import passport from 'passport';
import { setup } from './passport';

const debug = createDebug('auth');
const authRouter = express.Router();

export const handleAuthError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

setup(passport);

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/act-now/success',
  })
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/act-now/success',
  })
);

authRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to auth.',
    version: 'v1',
  });
});

export default authRouter;
