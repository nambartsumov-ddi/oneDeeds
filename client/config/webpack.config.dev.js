const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages'); //TODO: Implement
const StyleLintPlugin = require('stylelint-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const appConfig = require('./config');

// const env = process.env.NODE_ENV;

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  // the home directory for webpack
  context: appConfig.paths.appSrc,
  stats: 'normal',
  entry: {
    app: appConfig.paths.appIndexJs,
  },
  output: {
    path: appConfig.paths.appBuild,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: appConfig.paths.appSrc,
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
        test: /\.(css|scss)$/,
        include: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.module.(css|scss)$/,
        exclude: [/(node_modules)/, appConfig.paths.srcStyles],
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
        include: [appConfig.paths.srcStyles],
        exclude: /node_modules/,
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
    modules: [appConfig.paths.appSrc, appConfig.paths.appNodeModules],
    alias: {
      Components: appConfig.paths.appSrc + '/components',
      Containers: appConfig.paths.appSrc + '/containers',
      Pages: appConfig.paths.appSrc + '/pages',
      Actions: appConfig.paths.appSrc + '/actions',
      Reducers: appConfig.paths.appSrc + '/reducers',
      Store: appConfig.paths.appSrc + '/store',
      Styles: appConfig.paths.srcStyles,
    },
  },
  serve: {
    port: 3000,
    hmr: true,
    open: true,
  },
  plugins: [
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: appConfig.paths.appHtml,
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
