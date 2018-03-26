var path = require('path');
module.exports = {
    entry: './ts/app.ts',
    mode: 'development',
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
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../public/js')
    }
};
//# sourceMappingURL=webpack.config.js.map
