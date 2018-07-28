const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withSourceMaps = require('@zeit/next-source-maps');
const dotenv = require('dotenv');
const withProgressBar = require('next-progressbar');

dotenv.config({
  path: '.env',
});

const nextConfig = {
  distDir: '../../build',
  webpack: function(config, { buildId, dev, isServer, defaultLoaders }) {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  },
};

const optimizedImagesOptions = {};

module.exports = withPlugins([withProgressBar, withSourceMaps, [withOptimizedImages, optimizedImagesOptions]], nextConfig);
