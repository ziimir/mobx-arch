const path = require('path');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const config = require('config');

const baseConfig = require('./tools/webpack.base.config');
const devConfig = require('./tools/webpack.dev.config');
const prodConfig = require('./tools/webpack.prod.config');

const {rootDir} = require('./tools/utils');

const buildPath = config.get('build.serverOutput');

const serverConfig = {
    target: 'node',
    entry: path.resolve(rootDir, 'src/server/index.ts'),
    output: {
        path: path.resolve(rootDir, buildPath),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    externals: [
        nodeExternals()
    ],
    module: {
        // не парсим модули загруженные через nativeRequire
        // предпологается это уже побилженные файлы ssr и мапа с ассетами
        noParse: /native-require/,
        rules: [
            {
                test: /\.pug/i,
                use: [{
                    loader: 'pug-loader'
                }]
            }
        ]
    },
    node: {
        __filename: true,
        __dirname: true
    }
};

module.exports = merge(
    baseConfig,
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    serverConfig
);
