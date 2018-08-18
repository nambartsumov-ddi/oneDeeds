'use strict';

const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === 'production';
const ASSET_URL = process.env.ASSETS_URL;

const appDir = fs.realpathSync(process.cwd());
const resolve = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  rootPath: resolve('.'),
  indexHtmlPath: resolve('src/index.html'),
  buildPath: resolve(`build/`),
  buildStaticPath: resolve('build/static'),
  publicPath: ASSET_URL || '/',
  srcPath: resolve('src'),
  srcStaticPath: resolve('src/static'),
  srcStylesPath: resolve('src/styles'),
  // serverPath: resolve('server'),
  srcEntryPath: resolve('src/index.js'),
  // serverEntryPath: resolve('src/server/index.js'),
  nodeModulesPath: resolve('./node_modules'),
  babelrcPath: resolve('./.babelrc'),
  pkgJsonPath: resolve('./package.json'),
  webpackConfigPath: resolve('./webpack.config.js'),
};
