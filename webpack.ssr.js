const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const config = require('config');

const baseConfig = require('./tools/webpack.base.config');
const devConfig = require('./tools/webpack.dev.config');
const prodConfig = require('./tools/webpack.prod.config');

const {rootDir} = require('./tools/utils');

const buildPath = config.get('build.clientOutput');
const publicPath = config.get('build.publicPath');

const serverConfig = {
    target: 'node',
    entry: path.resolve(rootDir, 'src/server/index.ssr.tsx'),
    output: {
        // все ассеты хотим положить в out/assets
        path: path.resolve(rootDir, buildPath),
        // а сам файл хотим чтоб лежал в build
        filename: '../server.page.js',
        publicPath: publicPath,
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'null-loader'
                }]
            }
        ]
    }
};

module.exports = merge(
    baseConfig,
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    serverConfig
);
