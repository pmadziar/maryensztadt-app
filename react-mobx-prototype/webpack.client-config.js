const path = require(`path`);
const webpack = require(`webpack`);

const srcdir = path.resolve(__dirname,`src/client`);
const libdir = path.resolve(__dirname,`src/lib`);
const nodemodulesdir = path.resolve(__dirname, `node_modules`);

module.exports = {
    module: {
        loaders: [{
                test: /\.js[x]?$/,
                loader: `babel-loader`,
                include: [ srcdir, libdir ],
                exclude: [ nodemodulesdir ],
                query: {
                    plugins: [`transform-runtime`, `transform-decorators-legacy`, `transform-class-properties`],
                    presets: [`latest`, `react`],
                }
            }],
    },
    entry: [
        `babel-polyfill`,
        srcdir
    ],
    output: {
        path: path.resolve(__dirname, `build/client/js`),
        filename: `maryensztadt.js`
    }
};
