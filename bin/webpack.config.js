const path = require('path');

module.exports = {
  entry: './ts/app.ts',
  mode: 'development',
  watch: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx','.ts','.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public/js')
  }
};
