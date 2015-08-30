const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssImport = require('postcss-import');
const cssnext = require('cssnext');
const postcssNested = require('postcss-nested');
const postcssOpacity = require('postcss-opacity');
require('ng-annotate-loader');
require('./server.js');

const rootPaths = [
  path.join(__dirname, './bower_components')
];

var entry = {
  app: ['./app'],
  vendor: [
    './vendor'
  ],
  ie8supports: './ie8supports'
};

var outputFilename = '[name].js';

var plugins = [
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './app.html'
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new ExtractTextPlugin('[name].[contenthash:6].css'),
    new webpack.optimize.UglifyJsPlugin({
      banner: '',
      footer: '',
      mangle: {},
      beautify: false,
      report: 'min',
      expression: false,
      compressor: {
        warnings: false
      }
    })
  );
  outputFilename = '[name].[chunkhash:6].js';
} else {
  plugins.push(
    new ExtractTextPlugin('[name].css')
  );
}

module.exports = {
  entry: entry,
  output: {
    path: './dist',
    publicPath: '/static/dist/',
    filename: outputFilename
  },
  resolve: {
    root: rootPaths
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'jshint-loader' }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel!ng-annotate?add=true' },
      { test: /\.html$/, loader: 'ngtemplate?prefix=/static&relativeTo=' + path.resolve(__dirname) + '!html' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?compatibility=ie8!postcss') },
      { test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/, loader: 'url?limit=1000&name=[path][name].[hash:6].[ext]' }
    ]
  },
  postcss: function() {
    return [
      cssImport({
        path: [path.join(__dirname, './common/css')],
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      postcssNested,
      postcssOpacity,
      cssnext({ browsers: ['ie >= 8', 'chrome >= 26', 'Firefox ESR'] })
    ];
  },
  plugins: plugins,
  stats: { children: false }
};
