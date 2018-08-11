// const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  mode: env,
  entry: { app: './src/index.js' },

  output: {
    path: path.resolve(__dirname, `dist/${env}`),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /dist/],
        use: ['eslint-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /dist/],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    alias: {},
  },
  serve: {
    port: 3000,
    hmr: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: './index.html',
    }),
  ],
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  stats: {
    colors: true,
  },
};
