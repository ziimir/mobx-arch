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
        // нужно сделать для всех импортящихся модулей из билда
        {
            'out/server.page.js':  './server.page',
            'out/manifest.json':  './manifest.json'
        },
        nodeExternals()
    ],
    module: {
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
