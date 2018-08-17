const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages'); //TODO: Implement
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const appConfig = require('./config');

const env = process.env.NODE_ENV;

module.exports = {
  name: 'dev-client',
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  context: appConfig.paths.srcPath, // the home directory for webpack
  stats: 'normal',
  entry: {
    app: appConfig.paths.srcEntryPath,
  },
  output: {
    path: appConfig.paths.buildPath,
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: appConfig.paths.srcPath,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.module.(css|scss)$/,
        exclude: [appConfig.paths.srcStylesPath],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              camelCase: true,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: ['> 5%', 'not ie 11', 'not op_mini all', 'not dead'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        include: [appConfig.paths.srcStylesPath],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: ['> 5%', 'not ie 11', 'not op_mini all', 'not dead'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(css)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [appConfig.paths.srcPath, appConfig.paths.nodeModulesPath],
    alias: {
      Components: appConfig.paths.srcPath + '/components',
      Containers: appConfig.paths.srcPath + '/containers',
      Pages: appConfig.paths.srcPath + '/pages',
      Actions: appConfig.paths.srcPath + '/actions',
      Reducers: appConfig.paths.srcPath + '/reducers',
      Store: appConfig.paths.srcPath + '/store',
      Styles: appConfig.paths.srcPath + '/styles',
    },
  },
  serve: {
    port: 3000,
    hmr: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appConfig.paths.indexHtmlPath,
      filename: 'index.html',
    }),

    // new InterpolateHtmlPlugin({
    //   PUBLIC_URL: publicUrl,
    //   // You can pass any key-value pairs, this was just an example.
    //   // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    // }),

    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
    }),

    // Makes some environment variables available to the JS code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // TODO: Make this conditional, based on a flag
    // new BundleAnalyzerPlugin(),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
