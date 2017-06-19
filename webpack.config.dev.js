const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [path.join(__dirname, 'source', 'jsx', 'index.jsx')],
  output: {
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
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
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'source')]
  }
};
