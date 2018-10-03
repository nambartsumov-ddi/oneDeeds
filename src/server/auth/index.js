import express from 'express';
import createDebug from 'debug';
import passport from 'passport';
import passportSetup from './passport';
import config from '../config';

const debug = createDebug('auth');
const authRouter = express.Router();

export const handleAuthError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

debug('/auth route...');
passportSetup(passport);

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
