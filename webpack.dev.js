const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const devConfig = {
  output: {
    filename: '[name].dev.js',
  },
  mode: 'development',
  target: 'web',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'template title',
      template: 'templates/index.html'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'templates'),
    },
    hot: true,
    open: {
      app: {
        name: 'Google Chrome Canary',
      },
    },
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
