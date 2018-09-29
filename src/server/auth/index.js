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

authRouter.get('/local', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect:
      process.env.NODE_ENV === 'development'
        ? `http://${process.env.HOST}:3000/act-now`
        : `${process.env.PRODUCTION_URL_APP}/act-now`,
    failureRedirect:
      process.env.NODE_ENV === 'development'
        ? `${process.env.HOST}:3000/act-now`
        : `${process.env.PRODUCTION_URL_APP}/act-now`,
  })
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

authRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to auth.',
    version: 'v1',
  });
});

export default authRouter;
