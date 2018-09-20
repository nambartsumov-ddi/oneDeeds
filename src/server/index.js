import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import api, { handleError } from './api';

dotenv.config();

// const { PRODUCTION_URL_APP, PRODUCTION_URL_API } = process.env;
// const ROOT_URL = dev ? `http://localhost:${port}` : PRODUCTION_URL_API;
// const MONGO_URL = isDevelopment ? process.env.MONGO_URL_DEVELOPMENT : process.env.MONGO_URL_PROPDUCTION;

const isDevelopment = process.env.NODE_ENV === 'development';
const debug = createDebug('server');
const port = process.env.API_PORT || 8000;

const app = express();

// Middlewares
if (isDevelopment) {
  app.use(cors({ origin: true }));
}
app.use(morgan(isDevelopment ? 'dev' : 'tiny')); // tiny, dev, short
app.use(helmet());
app.use(express.json());

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
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on port ${chalk.blue(port)}...`);
});
