    /* Webpack config file - single file conversion
 ================================================================ */
var path = require('path');

module.exports = {
    entry: './app/assets/scripts/app.js',
    output: {
        path: path.resolve(__dirname, './app/public/scripts'), // absolute path
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',     // convert .js files
                query: {
                    presets: ['es2015']     // convert from es2015 js
                },
                test: /\.js$/,              // applied to js files only (reg expression)
                exclude: /node-modules/     // exclude node-modules dir
            }
        ]
    }
}