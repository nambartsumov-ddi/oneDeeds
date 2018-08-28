'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatterPretty = require('eslint-formatter-pretty');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

const appConfig = require('../index');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isDevelopment = env === 'development';

module.exports = {
  name: 'client',
  mode: env,
  target: 'web',
  devtool: isDevelopment ? 'module-source-map' : 'source-map',
  bail: isProduction,
  // the home directory for webpack
  context: appConfig.paths.client.root,
  stats: 'normal',
  entry: {
    app: appConfig.paths.client.indexJs,
  },
  output: {
    pathinfo: isDevelopment,
    path: appConfig.paths.client.build,
    filename: isDevelopment ? '[name].js' : 'scripts/[name].[chunkhash:8].js',
    chunkFilename: isDevelopment ? '[name].js' : 'scripts/[name].[chunkhash:8].js',
    publicPath: '/',
    // TODO: FIX THIS
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: appConfig.paths.client.root,
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
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|build|server)/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                highlightCode: true,
                compact: isProduction,
              },
            },
          },
          {
            test: /\.(css|scss)$/,
            include: /(node_modules)/,
            use: [
              isDevelopment ? { loader: 'style-loader', options: { sourceMap: true } } : MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
          {
            test: /\.module.(css|scss)$/,
            exclude: [/(node_modules)/, appConfig.paths.client.styles],
            use: [
              isDevelopment
                ? {
                    loader: 'style-loader',
                    options: {
                      sourceMap: true,
                    },
                  }
                : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  camelCase: true,
                  modules: true,
                  localIdentName: isDevelopment
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:5]-[emoji:2]',
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
            include: [appConfig.paths.client.styles],
            exclude: /(node_modules)/,
            use: [
              isDevelopment
                ? {
                    loader: 'style-loader',
                    options: {
                      sourceMap: true,
                    },
                  }
                : MiniCssExtractPlugin.loader,
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
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  optimization: {
    minimizer: isProduction
      ? [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                comparisons: false,
              },
              output: {
                comments: false,
              },
            },
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              map: {
                inline: false,
                annotation: true,
              },
            },
          }),
        ]
      : [],
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /(node_modules)/,
    //       name: 'vendor',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [appConfig.paths.nodeModules, appConfig.paths.client.root],
    alias: {
      Components: appConfig.paths.client.components,
      Containers: appConfig.paths.client.containers,
      Pages: appConfig.paths.client.pages,
      Actions: appConfig.paths.client.actions,
      Reducers: appConfig.paths.client.reducers,
      Store: appConfig.paths.client.store,
      Styles: appConfig.paths.client.styles,
      Images: appConfig.paths.client.images,
    },
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),

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
    hints: isDevelopment ? false : 'warning',
  },
};

if (isProduction) {
  module.exports.plugins.unshift(
    new CopyWebpackPlugin([
      {
        from: appConfig.paths.client.assets,
        to: appConfig.paths.client.buildAssets,
      },
      {
        from: appConfig.paths.public,
        to: appConfig.paths.build,
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: appConfig.paths.client.indexHtml,
      filename: 'index.html',
      favicon: appConfig.paths.client.favicon,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
      },
    })
  );
}

if (isDevelopment) {
  module.exports.plugins.unshift(
    new HtmlWebpackPlugin({
      template: appConfig.paths.client.indexHtml,
      filename: 'index.html',
      favicon: appConfig.paths.client.favicon,
      inject: true,
    })
  );

  module.exports.serve = {
    port: process.env.CLIENT_PORT,
    hmr: true,
    open: true,
    add: (app, middleware, options) => {
      const historyOptions = {
        verbose: false,
      };

      // To remove the "/api" prefix when proxying the API requests, just add
      // "pathRewrite: { '^/api': '' }" to proxy's options.
      app.use(convert(proxy('/api', { target: require(appConfig.paths.packageJson).proxy })));
      app.use(convert(history(historyOptions)));
    },
  };
}
