const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  mode: 'development',
  target: 'node',
  entry: '../src/server/index.js',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: true,
              debug: false,
              targets: {
                node: 'current',
              },
            },
          ],
        },
      },
    ],
  },

  externals: [webpackNodeExternals()],
};
