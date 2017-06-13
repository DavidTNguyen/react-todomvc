const webpack = require('webpack');

module.exports = {
  entry: [
    './source/jsx/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  devtool: 'eval',
  module: {
    rules: [
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
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: ['source', 'node_modules']
  }
};
