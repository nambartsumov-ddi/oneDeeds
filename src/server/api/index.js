import express from 'express';
import createDebug from 'debug';

const debug = createDebug('api');
const apiRouter = express.Router();

debug('api route...');

apiRouter.get('/', (req, res, next) => {
  debug('/ requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default apiRouter;
