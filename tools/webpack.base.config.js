const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const {rootDir} = require('./utils');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(rootDir, 'babel.config.js')
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
