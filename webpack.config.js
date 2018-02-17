var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

var development = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: development ? 'source-map' : undefined,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.js'
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: development ? [
    new DashboardPlugin()
  ] : [
    new UglifyJSPlugin({ sourceMap: true })
  ]
};
