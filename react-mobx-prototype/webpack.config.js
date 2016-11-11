const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/maryensztadt.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'maryensztadt.js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'app'),
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}
