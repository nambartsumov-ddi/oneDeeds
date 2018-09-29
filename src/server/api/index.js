import express from 'express';
import createDebug from 'debug';
// import User from '../api/resources/user/user.model';

const debug = createDebug('api');
const apiRouter = express.Router();

export const handleApiError = function(err, _, res, __) {
  debug(err.stack);
  res.json({ error: err.message || err.toString() });
};

// apiRouter.get('/user', (req, res) => {
//   const id = '5baf4e69768a41a16cb494f9';
//   User.findById(id, function(err, user) {
//     if (err) return res.json({ error: 'error' });

//     if (user) {
//       res.json(user);
//     }
//   });
// });

apiRouter.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to oneDeeds API.',
    version: 'v1',
  });
});

export default apiRouter;
