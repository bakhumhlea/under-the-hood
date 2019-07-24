/* eslint-disable no-undef */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.api.config.js');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
});

server.listen(8080, 'localhost', () => console.log("Server is running!"))