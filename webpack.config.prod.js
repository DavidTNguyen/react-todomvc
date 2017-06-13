const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const Babili = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './source/jsx/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'js')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssnano({
                  discardComments: {
                    removeAll: true
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new Babili({}, {
      comments: false
    }),
    new CopyWebpackPlugin([
      { from: 'source/index.html', to: '../index.html' },
      { from: 'source/favicon.ico', to: '../favicon.ico' }
    ])
  ]
};
