const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatterPretty = require('eslint-formatter-pretty');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const { execSync } = require('child_process');

const appConfig = require('./config');

const publicPath = '/';
// const publicUrl = '';
// const env = getClientEnvironment(publicUrl);

const isWindows = process.platform === 'win32';

module.exports = {
  name: 'client',
  mode: 'development',
  devtool: 'eval-source-map',
  // the home directory for webpack
  context: appConfig.paths.appSrc,
  stats: 'normal',
  entry: {
    app: appConfig.paths.appIndexJs,
  },
  output: {
    path: appConfig.paths.appBuild,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: publicPath,
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
              formatter: eslintFormatterPretty,
              failOnError: false,
              cache: false,
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
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.module.(css|scss)$/,
        exclude: [/(node_modules)/, appConfig.paths.srcStyles],
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              camelCase: true,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        include: [appConfig.paths.srcStyles],
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
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
      Media: appConfig.paths.appMedia,
      Images: appConfig.paths.appImages,
    },
  },
  plugins: [
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: appConfig.paths.appHtml,
      filename: 'index.html',
    }),

    // new InterpolateHtmlPlugin({
    //   PUBLIC_URL: publicUrl,
    //   // You can pass any key-value pairs, this was just an example.
    //   // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    // }),

    new webpack.ProvidePlugin({
      _: 'lodash-es',
      moment: 'moment',
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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

module.exports.serve = {
  port: 3000,
  hmr: true,
  open: isWindows,
  add: (app, middleware, options) => {
    const historyOptions = {
      verbose: false,
    };

    // To remove the "/api" prefix when proxying the API requests, just add
    // "pathRewrite: { '^/api': '' }" to proxy's options.
    app.use(convert(proxy('/api', { target: require(appConfig.paths.appPackageJson).proxy })));
    app.use(convert(history(historyOptions)));
  },
  on: {
    listening: () => {
      if (isWindows) {
        return;
      }
      execSync('ps cax | grep "Google Chrome"');
      execSync(`osascript chrome.applescript "${encodeURI(`http://localhost:3000`)}"`, {
        cwd: __dirname,
        stdio: 'ignore',
      });
    },
  },
};
