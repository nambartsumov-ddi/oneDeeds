'use strict';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const clientConfig = require('./config/webpack/webpack.config.client');
const serverConfig = require('./config/webpack/webpack.config.server');

const webpackConfig = process.env.CLIENT ? clientConfig : serverConfig;

module.exports = webpackConfig;
