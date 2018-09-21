import express from 'express';
import createDebug from 'debug';

const debug = createDebug('api');
const apiRouter = express.Router();

export const handleApiError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

apiRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to oneDeeds API.',
    version: 'v1',
  });
});

export default apiRouter;
