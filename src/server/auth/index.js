import express from 'express';
import createDebug from 'debug';

const debug = createDebug('auth');
const authRouter = express.Router();

export const handleAuthError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

authRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to auth.',
    version: 'v1',
  });
});

export default authRouter;
