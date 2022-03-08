const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const template = path.resolve(__dirname, '../src/index.tpl');
const entry = path.resolve(__dirname, '../src/index.js');

module.exports = {
  entry: {
    main: entry
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    // laoder的加载顺序是从下往上，从右往左的，所以配置loader的时候要注意一下顺序。
    rules: [
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
    new HtmlWebpackPlugin({
      template,
      title: 'Calendar Component For Vue',
      filename: 'index.html'
    }),
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      // chunks: 'async', // async表示只对异步代码进行分割
      minSize: 30000,  // 当超过指定大小时做代码分割
      // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {  // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重越大，打包优先级越高
          // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
          name: 'vender'
        },
        default: {
          minChunks: 2,
          priority: -20,
          name: 'common',
          // filename: 'js/common.js',
          reuseExistingChunk: true // 是否复用已经打包过的代码
        }
      }
    },
    usedExports: true
  },
}