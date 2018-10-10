'use strict';

const webpackNodeExternals = require('webpack-node-externals');

const appConfig = require('../index');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  name: 'server',
  mode: env,
  target: 'node',
  devtool: 'source-map',
  bail: isProduction,
  // the home directory for webpack
  context: appConfig.paths.server.root,
  stats: 'normal',
  entry: {
    server: appConfig.paths.server.indexJs,
  },

  output: {
    filename: '[name].js',
    path: appConfig.paths.build.root,
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|build|client)/,
        include: /(server)/,
        use: 'babel-loader',
      },
    ],
  },

  resolve: {
    alias: {
      Config: appConfig.paths.appConfig,
    },
  },

  externals: [webpackNodeExternals()],
};
