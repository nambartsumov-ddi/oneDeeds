const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatterPretty = require('eslint-formatter-pretty');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

const appConfig = require('../');

// const publicUrl = '';
// const env = getClientEnvironment(publicUrl);
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
  context: appConfig.paths.root,
  stats: 'normal',
  entry: {
    app: appConfig.paths.client.indexJs,
  },
  output: {
    path: appConfig.paths.client.build,
    filename: isDevelopment ? '[name].js' : 'scripts/[name].[chunkhash:8].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : 'scripts/[name].[chunkhash:8].chunk.js',
    publicPath: isDevelopment ? '/' : appConfig.paths.client.buildPublicPath,
    // devtoolModuleFilenameTemplate: (info) => 'file://' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
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
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|build|server)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
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
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'vendor',
          chunks: 'all',
        },
        // TODO: Do we need this in development?
        // styles: {
        //   name: 'styles',
        //   test: /\.(css)$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
      },
    },
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
    new HtmlWebpackPlugin({
      inject: true,
      template: appConfig.paths.client.indexHtml,
      filename: 'index.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyURLs: true,
      // },
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
    hints: isDevelopment ? false : 'warning',
  },
};

if (isDevelopment) {
  module.exports.plugins.unshift(
    new CopyWebpackPlugin([
      // {
      //   from: appConfig.paths.appStatic,
      //   to: appConfig.paths.appBuildStatic,
      //   cache: true,
      // },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[name].[contenthash].css',
    })
  );
  module.exports.serve = {
    port: 3000,
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
