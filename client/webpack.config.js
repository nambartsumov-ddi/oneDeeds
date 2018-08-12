const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  mode: env,
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, `dist/${env}`),
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 400000,
    maxAssetSize: 300000
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

    // isProduction && new ExtractTextPlugin('/css/style.css'),

    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),

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
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  stats: 'normal',
};
