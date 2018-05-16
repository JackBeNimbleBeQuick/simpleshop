const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  mode: 'development',
  watch: false,
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'script-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx','.ts','.js' ],
  },
  output: {
    devtoolLineToLine: true,
    filename: 'app.js',
    path: path.resolve(__dirname, '../public/js')
  }
};
