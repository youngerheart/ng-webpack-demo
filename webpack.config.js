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
// 定义入口
var entry = {
  app: ['./app'],
  vendor: [
    './vendor'
  ],
  ie8supports: './ie8supports'
};
// 定义输出文件名
var outputFilename = '[name].js';

var plugins = [
  // 渲染一个html文件，加入之前声明过的js文件名
  new HtmlWebpackPlugin({
    filename: '../index.html', // 相对于dist目录
    template: './app.html'
  })
];

if (process.env.COMPRESS) { // 该变量需要在package.json的script中声明，是否进行压缩
  plugins.push(
    new ExtractTextPlugin('[name].[contenthash:6].css'),// 保存带版本号的css
    new webpack.optimize.UglifyJsPlugin({// 进行压缩
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
  outputFilename = '[name].[chunkhash:6].js'; // js文件名加上版本号
} else {
  plugins.push(
    new ExtractTextPlugin('[name].css') // 以文件名保存css文件
  );
}

module.exports = {
  entry: entry,
  output: {
    path: './dist', // 打包文件存放的路径
    publicPath: '/static/dist/', // 网站运行时访问的路径
    filename: outputFilename // 输出文件的名称
  },
  resolve: {
    root: rootPaths // 增加除了根目录之外的路径？
  },
  module: {
    preLoaders: [ // exclude: 排斥
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'jshint-loader' } // 读取之前进行路法检测
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel!ng-annotate?add=true' }, // 进行es6的转换,并且进行依赖注入的转换
      { test: /\.html$/, loader: 'ngtemplate?prefix=/static&relativeTo=' + path.resolve(__dirname) + '!html' }, // 读取某个路径的html，并且加上/static的路径
      // webpack 如果不特別对 style 做处理，在打包时是將 require 的 css 文件直接输出在 html 的 head 中，要独立出 .css 文件必须使用到 extract-text-webpack-plugin
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?compatibility=ie8!postcss') }, // 读取css文件，并且使用postcss预编译
      { test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/, loader: 'url?limit=1000&name=[path][name].[hash:6].[ext]' } // 读取其他静态资源
    ]
  },
  // css的预编译器
  postcss: function() {
    return [
      // 引入外部css文件
      // cssImport({
      //   path: [path.join(__dirname, './common/css')],
      //   onImport: function (files) {
      //     files.forEach(this.addDependency);
      //   }.bind(this)
      // }),
      postcssNested, // 可以嵌套
      postcssOpacity, // 透明效果兼容？
      cssnext({ browsers: ['ie >= 8', 'chrome >= 26', 'Firefox ESR'] }) // 自动增加前缀
    ];
  },
  plugins: plugins, // 需要使用的插件
  stats: { children: false } // 统计配置
};
