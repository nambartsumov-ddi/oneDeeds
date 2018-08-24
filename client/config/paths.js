'use strict';

const path = require('path');
const fs = require('fs');

// const env = process.env.NODE_ENV;

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  publicPath: '/',
  appClient: resolveApp(''),
  appHtml: resolveApp('src/index.html'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appBuildStatic: resolveApp('build/static'),
  appStatic: resolveApp('src/static'),
  appMedia: resolveApp('src/static/media'),
  appImages: resolveApp('src/static/media/images'),
  srcStyles: resolveApp('src/styles'),
  appIndexJs: resolveApp('src/index.js'),
  dotenv: resolveApp('.env'),
  babelrcPath: resolveApp('.babelrc'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
};
