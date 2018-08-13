const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const appConfig = require('./config');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isDevelopment = env === 'development';

module.exports = {
  name: 'client',
  mode: env,
  target: 'web',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  bail: isProduction,
  entry: {
    app: [
      // 'react-error-overlay',
      appConfig.paths.srcEntryPath,
    ],
  },
  output: {
    path: appConfig.paths.buildPath,
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: '[name].chunk.js',
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
            compact: isProduction,
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: [appConfig.paths.srcStylesPath],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'], // TODO: Improve with browserslist
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
          // 'import-glob-loader
        ],
      },
      {
        test: /\.(css|scss)$/,
        include: [appConfig.paths.srcStylesPath],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'], // TODO: Improve with browserslist
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
          // 'import-glob-loader
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
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 400000,
    maxAssetSize: 300000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [appConfig.paths.srcPath, appConfig.paths.nodeModulesPath],
    alias: {},
  },
  serve: {
    port: 3000,
    hmr: true,
    open: true,
  },
  stats: {
    // 'normal'
    colors: true,
    assets: true,
    modules: false,
    builtAt: false,
    source: false,
    children: false,
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: appConfig.paths.indexHtmlPath,
      filename: 'index.html',
    }),

    // isProduction && new ExtractTextPlugin('/css/style.css'),

    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),

    // TODO: Make this conditional, based on a flag or something.
    // new BundleAnalyzerPlugin(),
  ],
};
