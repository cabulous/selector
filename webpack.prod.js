const webpack = require('webpack');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const prodConfig = {
  output: {
    filename: '[name].min.js',
  },
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
  ],
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
