const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'source', 'index.js'),
  output: {
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[local]-[hash:base64:3]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HTMLPlugin({
      template: path.join(__dirname, 'source', 'templates', 'dev.ejs'),
      inject: true
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'source', 'assets')]
  }
};
