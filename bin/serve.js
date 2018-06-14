const serve = require('webpack-serve');
const config = require('./webpack.config.js');
const path = require('path');
const util = require('util');

const port= 8093;
const entryPoint = path.resolve(__dirname, '../public');
const serverConfig = {
    host: 'localhost',
    compiler: null,
    content: entryPoint,
    port: port,
    config: config,
    on: {
        listening: () => {
            console.log(util.inspect('  Listening on port: ' + port, {colors: true, depth: 0}));
            console.log(util.inspect('  Serving from: ' + entryPoint, {colors: true, depth: 0}));
        }
    },
};

serve(serverConfig);
