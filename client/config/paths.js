'use strict';

const path = require('path');
const fs = require('fs');

// const env = process.env.NODE_ENV;

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appHtml: resolveApp('src/index.html'),
  appBuild: resolveApp('build'),
  publicPath: '/',
  appSrc: resolveApp('src'),
  srcStyles: resolveApp('src/styles'),
  appIndexJs: resolveApp('src/index.js'),
  appNodeModules: resolveApp('node_modules'),
  babelrcPath: resolveApp('.babelrc'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
};
