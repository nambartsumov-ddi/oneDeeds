const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const next = require('next');

const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

const isDevelopment = process.env.NODE_ENV === 'development';

const app = next({ dir: './src/client', dev: isDevelopment });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.disable('x-powered-by');
  server.use(compression());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT, err => {
    if (err) {
      console.log('Maybe the PORT is in use? Try a different port.');
      throw err;
    }
    console.log(`🚀  app started in ${process.env.NODE_ENV} environment on port ${process.env.PORT}...`);
  });
});
