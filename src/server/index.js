import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import createDebug from 'debug';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import api, { handleApiError } from './api';
import auth, { handleAuthError } from './auth';

dotenv.config();
const debug = createDebug('server');

const isDevelopment = process.env.NODE_ENV === 'development';
const { PRODUCTION_URL_API, API_PORT, HOST, MONGO_URL_DEVELOPMENT, MONGO_URL_PROPDUCTION } = process.env;
const ROOT_URL = isDevelopment ? `${HOST}:${API_PORT}` : PRODUCTION_URL_API;
const MONGO_URI = isDevelopment ? MONGO_URL_DEVELOPMENT : MONGO_URL_PROPDUCTION;

// Database
mongoose.Promise = global.Promise;
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', (err) => {
  debug(`🚩 Error while connecting to DB: ${err.message}`);
});

db.once('open', () => {
  debug('🔗 mongodb connected successfully!');
});

// App server
const app = express();

// Middlewares
if (isDevelopment) {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(express.json());

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

app.listen(API_PORT, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on: ${chalk.blue(ROOT_URL)}...`);
});
