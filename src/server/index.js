import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import createDebug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

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
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json([
    {
      name: 'API',
      version: 'v1',
      Description: 'Welcome to API development',
    },
  ]);
});

app.listen(port, () => {
  debug(`🚀  Server started in ${chalk.gray(process.env.NODE_ENV)} mode on port ${chalk.blue(port)}...`);
});
