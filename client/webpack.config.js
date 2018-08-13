const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatterPretty = require('eslint-formatter-pretty');

const appConfig = require('./config');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  name: 'client',
  mode: env,
  target: 'web',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  bail: isProduction,
  entry: {
    app: appConfig.appPaths.srcEntryPath,
  },
  output: {
    path: appConfig.appPaths.buildPath,
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|build)/,
        include: appConfig.appPaths.srcPath,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatterPretty, // use react-dev-utils https://github.com/facebook/create-react-app/tree/next/packages/react-dev-utils
              eslintPath: require.resolve('eslint'),
              emitError: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|build)/,
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(node_modules)/,
          name: 'vendor',
          chunks: 'all',
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
    modules: [appConfig.appPaths.srcPath, appConfig.appPaths.nodeModulesPath],
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
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new HtmlWebpackPlugin({
      template: appConfig.appPaths.indexHtmlPath,
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

    // new BundleAnalyzerPlugin(), // TODO: Make this conditional, based on a flag or something.

    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   compress: {
    //     screw_ie8: true
    //   },
    //   comments: false
    // }),
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ],
};
