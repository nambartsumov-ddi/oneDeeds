const webpackProdConfig = require('./webpack.config.prod');
const webpackDevConfig = require('./webpack.config.dev');

const webpackConfig = process.env.NODE_ENV === 'production' ? webpackProdConfig : webpackDevConfig;

module.exports = webpackConfig;
