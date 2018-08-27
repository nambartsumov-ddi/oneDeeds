'use strict';

const webpackNodeExternals = require('webpack-node-externals');
const eslintFormatterPretty = require('eslint-formatter-pretty');

const appConfig = require('../index');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isDevelopment = env === 'development';

module.exports = {
  name: 'server',
  mode: env,
  target: 'node',
  devtool: isDevelopment ? 'module-source-map' : 'source-map',
  bail: isProduction,
  // the home directory for webpack
  context: appConfig.paths.server.root,
  stats: 'normal',
  entry: {
    server: appConfig.paths.server.indexJs,
  },

  output: {
    filename: '[name].js',
    path: appConfig.paths.server.build,
    publicPath: appConfig.paths.server.buildPublicPath,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        include: appConfig.paths.server.root,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatterPretty,
              failOnError: isProduction,
              cache: false,
            },
          },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|build|client)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  externals: [webpackNodeExternals()],
};
