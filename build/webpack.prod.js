const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const entry = path.resolve(__dirname, '../src/calendar/index.js');

module.exports = {
  mode: 'production',
  entry: {
    main: entry
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'vue-calendar-plus.js',
    library: 'vue-calendar-plus',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    // laoder的加载顺序是从下往上，从右往左的，所以配置loader的时候要注意一下顺序。
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
      },
      // 将es6编译成es5
      {
        test: /\.(jsx?|babel|es6)$/,
        exclude: /node_modules/,
        include: process.cwd(),
        // include: path.resolve(__dirname, '../examples'),
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        // test: /\.(jpg|png|gif)$/,
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: {
          // 和file-loader功能相同，更加智能
          loader: 'url-loader',
          options: {
            // 配置打包後的文件名
            name: '[name].[ext]?[hash]',
            outputPath: 'images/',
            // 當圖片大於4K時以文件形式輸出，否則以base64輸出
            limit: 4096
          }
        }
      },
      // 處理字體等文件
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  externals: {
    vue: "vue"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  }
}