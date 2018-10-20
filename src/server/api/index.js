import express from 'express';
import createDebug from 'debug';
import { setCookie } from '../auth/jwt';

import User from '../api/resources/user/user.model';

const debug = createDebug('api');
const apiRouter = express.Router();

debug('api route...');

apiRouter.post('/charge-stripe', (req, res, next) => {
  const { tokenId, userId } = req.body;

  const updatedUser = {
    isPaid: true,
  };

  // find a user and update as a paid user
  User.findByIdAndUpdate(userId, updatedUser, {
    fields: { name: 1, provider: 1, email: 1, isVerified: 1, isPaid: 1, isActive: 1, google: 1, facebook: 1 },
    new: true,
  }).exec((err, user) => {
    if (err) res.json({ err });

    if (!user) {
      return res.json({ err: 'We were unable to find a user.' });
    }

    setCookie(user, res);
    res.json(user);
  });
});

apiRouter.get('/', (req, res, next) => {
  debug('/ requested...');
  res.status(200).json({
    message: 'OK',
    version: 'v1',
  });
});

export default apiRouter;
