'use strict';

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PACKAGE_JSON = require('./package.json');
const OUTPUT_DIR = PACKAGE_JSON.name;
const PUBLIC_PATH = '/' + OUTPUT_DIR;

const config = {};
config.entry = {
  app: './src/app/app.js'
};

config.output = {
  path: __dirname + PUBLIC_PATH,
  publicPath: PUBLIC_PATH + '/',
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js'
};

config.module = {
  preLoaders: [],
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  }, {
    test: /\.less$/,
    loader: "style!css!less"
  }, {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'file'
  }, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file"
  }, {
    test: /\.html$/,
    loader: 'raw'
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&minetype=application/font-woff"
  }]
};
config.postcss = [
  autoprefixer({
    browsers: ['last 2 version']
  })
];
config.plugins = [];

module.exports = {
  OUTPUT_DIR: OUTPUT_DIR,
  PUBLIC_PATH: PUBLIC_PATH,
  config: config,
  publicPath: function(path) {
    config.output.publicPath = path;
  },
  addLoader: function(loader) {
    config.module.loaders.push(loader);
    return this;
  },
  htmlWebpackPlugin: new HtmlWebpackPlugin({
    template: './src/public/index.html',
    inject: 'body'
  }),
  extractTextPlugin: function(disable) {
    return new ExtractTextPlugin('[name].[hash].css', {
      disable: disable
    });
  }
};