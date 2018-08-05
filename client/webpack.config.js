"use strict";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [
    // POLYFILL: Set up an ES6-ish environment
    // 'babel-polyfill',  // The entire babel-polyfill
    // Or pick es6 features needed (included into babel-polyfill)
    // "core-js/fn/promise",
    // "core-js/es6/object",
    // "core-js/es6/array",
    "./src/index.js"
  ],
  devtool: "inline-source-map",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, `dist/${process.env.NODE_ENV}`),
    filename: "main.client.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /dist/],
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules")
    ],
    alias: {}
  },
  serve: {
    port: 3000,
    hmr: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
