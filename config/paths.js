'use strict';

const path = require('path');
const fs = require('fs');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  root: resolveApp(''),
  appConfig: resolveApp('config'),
  nodeModules: resolveApp('node_modules'),
  dotenv: resolveApp('.env'),
  packageJson: resolveApp('package.json'),
  yarnLock: resolveApp('yarn.lock'),
  public: resolveApp('public'),

  // Build
  build: {
    root: resolveApp('build/'),
    public: resolveApp('build/public'),
    indexHtml: resolveApp('build/public/index.html'),
    publicAssets: resolveApp('build/public/assets'),
  },

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
  },
  server: {
    // Entry
    root: resolveApp('src/server'),
    indexJs: resolveApp('src/server/index.js'),
  },
};
