const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smp = new SpeedMeasureWebpackPlugin();
const statsConfig = {
  output: {
    filename: '[name].js',
  },
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = smp.wrap(merge(baseConfig, statsConfig));
