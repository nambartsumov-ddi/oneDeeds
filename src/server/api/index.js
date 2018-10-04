import express from 'express';
import createDebug from 'debug';

import requireLogin from '../middlewares/requireLogin';
const debug = createDebug('api');
const apiRouter = express.Router();

export const handleApiError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

debug('api route...');

apiRouter.post('/paypal', requireLogin, (req, res) => {
  debug('/paypal route...');
});

apiRouter.get('/', (req, res, next) => {
  debug('/ requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default apiRouter;
