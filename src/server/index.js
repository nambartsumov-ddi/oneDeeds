import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoSessionStore from 'connect-mongo';
import passport from 'passport';
import helmet from 'helmet';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './db';
import api, { handleApiError } from './api';
import auth, { handleAuthError } from './auth';
import config from './config';

dotenv.config();
const debug = createDebug('server');
const isDevelopment = process.env.NODE_ENV === 'development';

// Database
connectDb(config.database.connectionURI);

// App server
const app = express();

const MongoStore = mongoSessionStore(session);
const sessionOptions = {
  name: config.sessionName,
  secret: config.sessionSecret,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60, // save session 14 days
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
  },
};

// Middlewares
if (isDevelopment) {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(helmet());
app.use(express.json());

if (!isDevelopment) {
  server.set('trust proxy', 1); // sets req.hostname, req.ip
  sessionOptions.cookie.secure = true; // sets cookie over HTTPS only
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', auth, handleAuthError);
app.use('/', api, handleApiError);

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

app.listen(config.apiPort, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on: ${chalk.blue(config.rootURL)}...`);
});
