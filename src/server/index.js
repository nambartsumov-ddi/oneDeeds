import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import appConfig from 'Config';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const debug = createDebug('server');
const port = process.env.API_PORT || 8000;

const app = express();

// Middlewares
if (isDevelopment) {
  app.use(cors({ origin: true }));
}
app.use(morgan('dev')); // tiny, dev, short
app.use(helmet());
app.use(compression());
app.use(express.json());

if (isProduction) {
  app.use(express.static('build'));
}

// Routes
app.get('/api', (req, res) => {
  res.json([
    {
      name: 'API',
      version: 'v1',
      Description: 'Welcome to API development',
    },
  ]);
});

if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(appConfig.paths.build.indexHtml);
  });
}

// In dev mode, we throw
app.get('/', (req, res, next) => {
  throw new Error('No API route found..');
});

// Error handling
app.use(function(err, req, res, next) {
  res.status(500);
  res.json({ message: err.message });
});

app.listen(port, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on port ${chalk.blue(port)}...`);
});
