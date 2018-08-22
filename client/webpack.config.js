const webpackDevConfig = require('./webpack.config.dev');
const webpackProdConfig = require('./webpack.config.prod');

const webpackConfig = process.env.NODE_ENV === 'production' ? webpackDevConfig : webpackProdConfig;

module.exports = webpackConfig;
