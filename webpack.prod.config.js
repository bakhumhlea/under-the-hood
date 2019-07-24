const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let config = require('./webpack.base.config');

config.mode = 'production';
config.devtool = '';

config.entry = [
  './src/index.js'
];

config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;

config.plugins = [ ...[new MiniCssExtractPlugin({
    filename: "cool-[name].css",
    chunkFilename: "[id].css"
  })],
  new OptimizeCSSAssetsPlugin({}),
  ...config.plugins
]

module.exports = config;