const clientConfig = require('./config/webpack/webpack.config.client');
const serverConfig = require('./config/webpack/webpack.config.server');

const webpackConfig = process.env.CLIENT ? clientConfig : serverConfig;

module.exports = webpackConfig;
