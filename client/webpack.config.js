const webpackProdConfig = require('./webpack.config.prod');
const webpackDevConfig = require('./webpack.config.dev');

const webpackConfig = process.env.NODE_ENV === 'production' ? webpackProdConfig : webpackDevConfig;
console.log(process.env.NODE_ENV);

module.exports = webpackConfig;
