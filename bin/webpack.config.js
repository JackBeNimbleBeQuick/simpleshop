const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './ts/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    modules:[
      path.resolve('./ts'),
      path.resolve('./node_modules'),
    ],
    extensions: [ '.tsx','.ts','.js' ],
  },
  output: {
    // devtoolLineToLine: true,
    filename: 'app.js',
    path: path.resolve(__dirname, '../public/js')
  }
};
