import { sign, verify } from 'jsonwebtoken';
import createDebug from 'debug';
import User from '../api/resources/user/user.model';
import config from '../config';

const debug = createDebug('jwt');

const secret = '6PlCxy2NSeTvtNt6BMftn2lErdpJtlGvC3TTnKHuOXModpkFLh6yw0sPZrLDTe9wJK4Hd2ld46Iv2AHdBpnnPg';
const cookieName = 'token';

const cookieOptions = config.isDevelopment
  ? {
      maxAge: 365 * 24 * 60 * 60 * 1000, // Year in milliseconds
    }
  : {
      secure: true,
      domain: config.rootDomainProd,
      maxAge: 365 * 24 * 60 * 60 * 1000, // Year in milliseconds
    };

export function setCookie(user, response) {
  if (user instanceof User) {
    user = user.toObject();
  }
  response.cookie(cookieName, sign(user, secret), cookieOptions);
}

// This will be used when a user will pay. It will be used as the callback so I know who is the paying user.
export function getUserFromCookie(request) {
  try {
    const cookie = request.cookies[cookieName];
    debug(cookie);
    if (cookie) {
      return verify(cookie, secret);
    }
  } catch (err) {
    debug('No cookie found');
    debug(err.message);
  }
}
