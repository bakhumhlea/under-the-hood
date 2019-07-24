import { HotModuleReplacementPlugin } from 'webpack';
import config from './webpack.base.config';

config.entry = [
  '@babel/polyfill',
  './src/index.js',
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
];

config.plugins = [ new HotModuleReplacementPlugin() , ...config.plugins];


export default config;
