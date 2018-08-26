'use strict';

const path = require('path');
const fs = require('fs');

// const env = process.env.NODE_ENV;

const appDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = {
  root: resolveApp(''),
  nodeModules: resolveApp('node_modules'),
  dotenv: resolveApp('.env'),
  packageJson: resolveApp('package.json'),
  yarnLock: resolveApp('yarn.lock'),
  client: {
    // Entry
    root: resolveApp('src/client'),
    indexHtml: resolveApp('src/client/index.html'),
    indexJs: resolveApp('src/client/index.js'),

    // Assets
    images: resolveApp('src/client/static/images'),
    styles: resolveApp('src/client/styles'),

    // Folders
    components: resolveApp('src/client/components'),
    containers: resolveApp('src/client/containers'),
    pages: resolveApp('src/client/pages'),
    actions: resolveApp('src/client/actions'),
    reducers: resolveApp('src/client/reducers'),
    store: resolveApp('src/client/store'),

    // Build
    build: resolveApp('build/client'),
    buildPublicPath: resolveApp('build/client/public'),
  },
  server: {},
};
