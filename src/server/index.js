import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import auth from './auth';
import api from './api';
import connectDb from './db';
import config from './config';

dotenv.config();
const debug = createDebug('server');
const isDevelopment = process.env.NODE_ENV === 'development';

// Database
connectDb(config.database.connectionURI);

// App server
const app = express();

// Middlewares
if (isDevelopment) {
  app.use(morgan('dev'));
}
// FIXME: in prod {origin: www.onedeeds.com}, in dev { origin: localhost:3000 }
app.use(cors());
app.use(helmet());
// TODO: Why do I need this?
app.use(cookieParser());
app.use(express.json());

if (!isDevelopment) {
  app.set('trust proxy', 1); // sets req.hostname, req.ip
}

app.use(passport.initialize());

// Routes
app.use('/auth', auth);
app.use('/', api);

// if we are here then the specified request is not found
app.use((req, res, next) => {
  debug('404 - Request Not Found');
  const err = new Error('404 - Request Not Found');
  err.status = 404;
  next(err);
});

// all other requests are not implemented.
app.use((err, req, res, next) => {
  debug('500 - Request Not Implemented');
  debug(err.stack);
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(config.apiPort, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on: ${chalk.blue(config.rootServerURL)}...`);
});
