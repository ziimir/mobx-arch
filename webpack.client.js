const path = require('path');
const {merge} = require('webpack-merge');
const config = require('config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

const baseConfig = require('./tools/webpack.base.config');
const devConfig = require('./tools/webpack.dev.config');
const prodConfig = require('./tools/webpack.prod.config');

const {rootDir} = require('./tools/utils');

const buildPath = config.get('build.clientOutput');
const publicPath = config.get('build.publicPath');

const clientConfig = {
    target: 'web',
    entry: {
        main: path.resolve(rootDir, 'src/client/index.tsx')
    },
    output: {
        path: path.resolve(rootDir, buildPath),
        filename: '[name].[contenthash].js',
        publicPath: publicPath,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            import: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(rootDir, 'tools/postcss.config.js')
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new WebpackManifestPlugin({
            fileName: path.resolve(rootDir, config.get('build.serverOutput'), 'manifest.json'),
            publicPath: publicPath,
            filter: (fileDescriptor) => fileDescriptor.isInitial
        })
    ]
};

module.exports = merge(
    baseConfig,
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    clientConfig
);
