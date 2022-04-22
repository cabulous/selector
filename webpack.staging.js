const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const stagingConfig = {
  output: {
    filename: '[name].staging.js',
  },
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'staging',
      DEBUG: true,
    }),
  ],
  stats: 'errors-only',
};

module.exports = merge(baseConfig, stagingConfig);
