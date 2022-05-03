const {getHashDigest} = require('loader-utils');
const TerserPlugin = require('terser-webpack-plugin');

const {rootDir, getIconFolders} = require('./utils');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }, {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {sourceMap: true}
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        // куда положить файл, считается от webpack.output.path
                        outputPath: './',
                        // что будет в урле вместо require(path)
                        publicPath: '/assets'
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        // куда положить файл, считается от webpack.output.path
                        outputPath: './',
                        // что будет в урле вместо require(path)
                        publicPath: '/assets'
                    }
                }]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({extractComments: false})
        ]
    }
};
