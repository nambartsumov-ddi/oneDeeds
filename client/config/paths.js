'use strict';

const path = require('path');
const fs = require('fs');

// const env = process.env.NODE_ENV;

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appClient: resolveApp(''),
  appHtml: resolveApp('src/index.html'),
  appBuild: resolveApp('build'),
  appBuildStatic: resolveApp('build/static'),
  appStatic: resolveApp('src/static'),
  appMedia: resolveApp('src/static/media'),
  appImages: resolveApp('src/static/media/images'),
  publicPath: '/',
  appSrc: resolveApp('src'),
  srcStyles: resolveApp('src/styles'),
  appIndexJs: resolveApp('src/index.js'),
  appNodeModules: resolveApp('node_modules'),
  babelrcPath: resolveApp('.babelrc'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
};
