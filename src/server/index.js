import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoSessionStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import api, { handleError } from './api';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';
const debug = createDebug('server');
const port = process.env.API_PORT || 8000;
const { PRODUCTION_URL_API, HOST, MONGO_URL_DEVELOPMENT, MONGO_URL_PROPDUCTION } = process.env;
const ROOT_URL = isDevelopment ? `${HOST}:${port}` : PRODUCTION_URL_API;
const MONGO_URL = isDevelopment ? MONGO_URL_DEVELOPMENT : MONGO_URL_PROPDUCTION;

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const app = express();

// Middlewares
if (isDevelopment) {
  const origin = `${HOST}:${port}`;
  app.use(cors({ origin }));
}
app.use(morgan(isDevelopment ? 'dev' : 'tiny')); // tiny, dev, short
app.use(helmet());
app.use(express.json());

// Database
const MongoStore = mongoSessionStore(session);
const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60, // save session 14 days
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    domain: isDevelopment ? HOST : PRODUCTION_URL_API,
  },
};

if (!isDevelopment) {
  server.set('trust proxy', 1); // sets req.hostname, req.ip
  sessionOptions.cookie.secure = true; // sets cookie over HTTPS only
}

const sessionMiddleware = session(sessionOptions);
app.use(sessionMiddleware);

// Routes
app.get('/', api, handleError);

// if we are here then the specified request is not found
app.use((req, res, next) => {
  debug('404 - Request Not Found');
  const err = new Error('404 - Request Not Found');
  err.status = 404;
  next(err);
});

// all other requests are not implemented.
app.use((err, req, res, next) => {
  debug('501 - Request Not Implemented');
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on: ${chalk.blue(ROOT_URL)}...`);
});
