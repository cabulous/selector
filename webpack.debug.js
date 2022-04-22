const webpack = require('webpack');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const debugConfig = {
  output: {
    filename: '[name].debug.js',
  },
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: true,
    }),
  ],
};

module.exports = smp.wrap(merge(baseConfig, debugConfig));
