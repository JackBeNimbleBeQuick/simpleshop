const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './ts/app.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  watch: false,
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'script-loader',
      //   exclude: '/node_modules/'
      // },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [ '.tsx','.ts','.js' ],
  },
  output: {
    // devtoolLineToLine: true,
    filename: 'app.js',
    path: path.resolve(__dirname, '../public/js')
  }
};
