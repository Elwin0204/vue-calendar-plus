const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./config');
const entry = path.resolve(__dirname, '../src/index.js');

module.exports = merge({
  mode: 'development',
  entry: {
    main: entry
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',  // 使用MiniCssExtractPlugin时就不能使用style-loader了
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2   // 该方式可以让@import引入的css文件再次执行一边css打包loader
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  output: {
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    port: 8086,
    hot: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#eval-source-map'
}, base)