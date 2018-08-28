'use strict';

const path = require('path');
const fs = require('fs');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  root: resolveApp(''),
  nodeModules: resolveApp('node_modules'),
  dotenv: resolveApp('.env'),
  packageJson: resolveApp('package.json'),
  yarnLock: resolveApp('yarn.lock'),
  public: resolveApp('public'),
  client: {
    // Entry
    root: resolveApp('src/client'),
    indexHtml: resolveApp('src/client/index.html'),
    indexJs: resolveApp('src/client/index.js'),
    styles: resolveApp('src/client/styles'),
    favicon: resolveApp('src/client/favicon.ico'),

    // Assets
    assets: resolveApp('src/client/assets'),
    images: resolveApp('src/client/assets/images'),

    // Folders
    components: resolveApp('src/client/components'),
    containers: resolveApp('src/client/containers'),
    pages: resolveApp('src/client/pages'),
    actions: resolveApp('src/client/actions'),
    reducers: resolveApp('src/client/reducers'),
    store: resolveApp('src/client/store'),

    // Build
    build: resolveApp('build/client'),
    buildAssets: resolveApp('build/client/assets'),
  },
  server: {
    // Entry
    root: resolveApp('src/server'),
    indexJs: resolveApp('src/server/index.js'),

    // Build
    build: resolveApp('build/server'),
    buildPublicPath: resolveApp('build/server'),
  },
};
